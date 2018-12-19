const socket = io.connect('https://plank-filter-master.herokuapp.com/')

console.log("imported change-background");
export default function changeAllBackgrounds(img){
    console.log("change all bckground");
    console.log("img passed in", img);
    let canvas = document.getElementById('myCanvas')
    canvas.style.backgroundImage = "url(/static/imgs/" + img + ")"


    socket.emit('change-background', img)
}
// changeAllBackground = (img) => {
//     console.log("change all bckground");
//     $('#myCanvas').css('background-image', 'url(' + '/static/imgs/' + images[img] + ')');
//     socket.emit('change-background', img)
// }



socket.on('change-background', (img) => {
    let canvas = document.getElementById('myCanvas')
    canvas.css('background-image', 'url(' + '/static/imgs/' + img + ')');
})