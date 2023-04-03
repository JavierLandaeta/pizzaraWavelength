let socket
let color = '#000'
let strokeWidth = 4
let cv
var startTime
const sum = [];
const xValues = [];
const yValues = [];
let xpos = 0;

function setup() {
        // Creating canvas
        cv = createCanvas(windowWidth / 2, windowHeight / 2)
        centerCanvas()
        cv.background(255, 255, 255)

        // Start the socket connection
        //socket = io.connect('http://localhost:3000')
        socket = io.connect('http://ec2-3-128-200-188.us-east-2.compute.amazonaws.com:3000')

        //Latency
        setInterval(function(){
                startTime = Date.now();
                socket.emit('ping');
        },2000);

        socket.on('pong', function(){
                // latency calculation
                latency = Date.now() - startTime;
                sum.push(latency);
                //average calculation
                const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
                const result = average(sum);
                // max and min calculation
                const max = Math.max.apply(null, sum);
                const min = Math.min.apply(null, sum);
                //Show results
                console.log(latency);
                $('#latency').text(latency);
                $('#result').text(Math.round(result* 100)/100);
                $('#max').text(max);
                $('#min').text(min);

                //Plot the values
                xpos = xpos + 1;
                yValues.push(latency);
                xValues.push(xpos)
                var myChart = new Chart("myChart", {
                        type: "line",
                        data: {
                                labels: xValues,
                                datasets: [{
                                        fill: false,
                                        lineTension: 0,
                                        backgroundColor: "rgba(0,0,255,1.0)",
                                        borderColor: "rgba(0,0,255,0.1)",
                                data: yValues
                                }]
                        },
                        options: {
                                legend: {display: false}
                        }
          });
        });

        document.getElementById('exportar').addEventListener('click', () => {
                downloadCSVFile('Latencias_AWS US East (Ohio)_us_east_2.csv', sum);
                //console.log(sum)
        });

        // Callback function
        socket.on('mouse', data => {
                stroke(data.color)
                strokeWeight(data.strokeWidth)
                line(data.x, data.y, data.px, data.py)
        })

        // Getting our buttons and the holder through the p5.js dom
        const color_picker = select('#pickcolor')
        const color_btn = select('#color-btn')
        const color_holder = select('#color-holder')

        const stroke_width_picker = select('#stroke-width-picker')
        const stroke_btn = select('#stroke-btn')

        // Adding a mousePressed listener to the button
        color_btn.mousePressed(() => {
                // Checking if the input is a valid hex color
                if (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color_picker.value())) {
                        color = color_picker.value()
                        color_holder.style('background-color', color)
                } else {
                        console.log('Enter a valid hex value')
                }
        })

        // Adding a mousePressed listener to the button
        stroke_btn.mousePressed(() => {
                const width = parseInt(stroke_width_picker.value())
                if (width > 0) strokeWidth = width
        })
}

function windowResized() {
        centerCanvas()
        cv.resizeCanvas(windowWidth / 2, windowHeight / 2, false)
}


function centerCanvas() {
        const x = (windowWidth - width) / 2
        const y = (windowHeight - height) / 2
        cv.position(x, y)
}


function mouseDragged() {
        // Draw
        stroke(color)
        strokeWeight(strokeWidth)
        line(mouseX, mouseY, pmouseX, pmouseY)

        // Send the mouse coordinates
        sendmouse(mouseX, mouseY, pmouseX, pmouseY)
}

// Sending data to the socket
function sendmouse(x, y, pX, pY) {
        const data = {
                x: x,
                y: y,
                px: pX,
                py: pY,
                color: color,
                strokeWidth: strokeWidth,
        }

        socket.emit('mouse', data)
}
function downloadCSVFile(filename, data) {
        const csv = convertToCSV(data); // convierte la matriz en una cadena de texto CSV
        console.log(csv)
        const blob = new Blob([csv], { type: 'text/csv' }); // crea un objeto Blob
        const link = document.createElement('a'); // crea un enlace de descarga
        link.download = filename; // establece el nombre de archivo
        link.href = window.URL.createObjectURL(blob); // establece la URL del archivo
        link.click(); // inicia la descarga
}

function convertToCSV(data) {
        const rows  = ['Latencias'].concat(data);
        const rowsheader = rows.join('\n');
        return rowsheader;
}