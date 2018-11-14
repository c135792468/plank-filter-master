import Animate from './Animate.js'

let canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

let animate = new Animate(canvas, ctx, "fffff")

setInterval(animate.draw, 10);


