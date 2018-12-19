const socket = io.connect('https://plank-filter-master.herokuapp.com/')

console.log("imported change-background");


socket.on('change-background', (img) => {
    let canvas = document.getElementById('myCanvas')
    canvas.css('background-image', 'url(/static/imgs/' + img + ')');
})