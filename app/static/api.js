console.log("successfully imported")
import socket from './show-multiple-users.js'

$(() => {
    $("#submit_handlr").on("click",() => {
        console.log("called")
        let fd = new FormData();
        let files = $('#img')[0].files[0];
        fd.append('file',files);
        fd.append('filter', $('#filter option:selected').attr("value"))

        $.ajax({
            url: '/filter',
            data: fd,
            type: 'POST',
            contentType: false,
            processData: false,
            success: (res) => {
                console.log("pppp ", res.file)
                $('#filtered').html("<img height=400 width=400 src='" + res.file + "'>")
            },
            error: (res) => {
                console.log(res)
            }
        }) 
    
    })

    $('#get-album').on('change', () => {
        $.ajax({
            url: '/lobby_select_album',
            type: 'POST',
            data: $('#album-selection').serialize(),
            success: (res) => {
                console.log("response for select labum");
                $('#album_imgs').empty()

                let images = res.imgs
                if(images.length < 1){
                    let empty_node = document.createElement("p")
                    empty_node.style.textAlign = "center"
                    empty_node.innerHTML = "There's nothing here..."

                    $('#album_imgs').append(empty_node)
                }else{
                    console.log("what is images", images);
                    for(let img in images){
                        let new_img = document.createElement("img")
                        let url = "/static/imgs/" + encodeURI(images[img])

                        new_img.src = url
                        new_img.style.cursor = 'pointer'
                        new_img.style.backgroundSize = "cover"
                        new_img.style.backgroundPosition = "center"
                        new_img.height = 100
                        new_img.width = 100
                        new_img.style.margin = "auto"
                        new_img.onclick = () => {
                            console.log("does socket exist", socket);

                            console.log("trying to change background");

                            $('#myCanvas').css('background-image', "url("+url+ ")");
                            socket.emit('change-background', url)
                            socket.emit('test')
                        }

                        $('#album_imgs').append(new_img)
                    }
                }
                
            }

        })
    })
})






