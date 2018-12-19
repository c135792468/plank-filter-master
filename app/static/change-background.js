const socket = io.connect('https://plank-filter-master.herokuapp.com/')

console.log("imported change-background");

socket.on('connect', () => {
    socket.on('change-background', (img) => {
        console.log("changed background form someone else");
    
        let canvas = document.getElementById('myCanvas')
        canvas.style.backgroundImage = "url("+ img +")"
    })
})

