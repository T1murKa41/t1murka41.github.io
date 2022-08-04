let canvas = document.getElementById("sandbox");
let context = canvas.getContext("2d");
let width = 300;
let height = 300;



function DrawDivisions(radius) {
    for (let d = 0; d < 60; d++) {
        let angle = d / 60 * 2*Math.PI;
        let x = Math.cos(angle) * radius;
        let y = -Math.sin(angle) * radius;

        let divX = 0.9 * x;
        let divY = 0.9 * y;

        x += radius; y += radius;
        divX += radius; divY += radius;

        let line = new Path2D();
        line.moveTo(x, y);
        line.lineTo(divX, divY);

        context.stroke(line);
    }
}

function getTimeNow() {
    let date = new Date();
    let hours, minutes, seconds;

    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();

    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
}


function getAngles() {
    let timeNow = getTimeNow();

    let hoursAngle, minutesAngle, secondsAngle;

    secondsAngle = (timeNow.seconds / 60) * (2 * Math.PI);
    minutesAngle = (timeNow.minutes / 60) * (2 * Math.PI);
    hoursAngle = ((timeNow.hours % 12)/12) * (2 * Math.PI);

    secondsAngle = Math.PI / 2 - secondsAngle;
    minutesAngle = Math.PI / 2 - minutesAngle;
    hoursAngle = Math.PI / 2 - hoursAngle;

    return {
        secondsAngle: secondsAngle,
        minutesAngle: minutesAngle,
        hoursAngle: hoursAngle
    }
}


function drawSecondsHand(angle, R) {
    let divX,divY;

    divX = Math.cos(angle) * 0.8 * R;
    divY = -Math.sin(angle) * 0.8 * R;
    divX += R; divY += R;

    let line = new Path2D();
    line.moveTo(R,R);
    line.lineTo(divX,divY);
    context.strokeStyle = "red";
    context.stroke(line);
    context.strokeStyle = "black";
}

function drawMinutesHand(angle, R) {
    let divX,divY;

    divX = Math.cos(angle) * 0.6 * R;
    divY = -Math.sin(angle) * 0.6 * R;
    divX += R; divY += R;

    let line = new Path2D();
    line.moveTo(R,R);
    line.lineTo(divX,divY);
    context.lineWidth = 3;
    context.stroke(line);
    context.lineWidth = 1;
}

function drawHoursHand(angle, R) {
    let divX,divY;

    divX = Math.cos(angle) * 0.5 * R;
    divY = -Math.sin(angle) * 0.5 * R;
    divX += R; divY += R;

    let line = new Path2D();
    line.moveTo(R,R);
    line.lineTo(divX,divY);
    context.lineWidth = 4;
    context.stroke(line);
    context.lineWidth = 1;
}


function drawWatch() {
    context.clearRect(0, 0, width, height)

    let R = width / 2;

    let circle = new Path2D();
    circle.arc(R, R, R, 0, 2*Math.PI);
    context.stroke(circle);

    let angles = getAngles();
   
    let line = new Path2D();
    line.moveTo(R, R);
    line.lineTo(150, 0)

    DrawDivisions(R);
    drawSecondsHand(angles.secondsAngle, R);
    drawMinutesHand(angles.minutesAngle, R);
    drawHoursHand(angles.hoursAngle, R)
    setTimeout(drawWatch, 1000);
}


window.onload = function() {
    drawWatch();
}