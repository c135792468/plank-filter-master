console.log("successfully imported")

$(() => {
    //submit button for filter
    $("#submit_handlr").on("click",() => {
        console.log("called")
        let fd = new FormData();
        let files = $('#img')[0].files[0];
        fd.append('file',files);
        fd.append('filter', $('#filter option:selected').attr("value"))
        fd.append('album_name', $('#album_name option:selected').attr("value"))

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


    //for album in lobby when it loadds next album (selected)
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
                            var socket = io.connect('https://plank-filter-master.herokuapp.com/');
                            console.log("does socket exist", socket);
                            console.log("trying to change background");

                            $('#myCanvas').css('background-image', "url("+url+ ")");
                            socket.emit('change-background', url)
                        }

                        $('#album_imgs').append(new_img)
                    }
                }
                
            }

        })

    })

    //delete function on album page
    $('.img-holder').on('click', function(){
        let src = $(this).children('img')[0].src

        popUp(event, src)
    })

    $('.delete').on('click', function(event){
        event.stopPropagation()
        $('form[name=delete_photo]').submit()
    })

    $('.img-holder').on('mouseenter', function(){
        let delete_btn = $(this).children('div').eq(0)
        delete_btn.css('display', '')
    })

    $('.img-holder').on('mouseleave', function(){
        $('.delete').css('display', 'none')
    })
})

function popUp(event, image){
    event.stopPropagation()

    $('#backdrop').css('pointer-events', 'auto')

    let background = document.getElementById("pop-up")
    background.style.opacity = 0.2
    
    let expanded_img = document.createElement("img")

    expanded_img.className="expanded-img"
    expanded_img.src = image
    expanded_img.height = 700
    expanded_img.width = 700
    
    document.body.appendChild(expanded_img)

    expanded_img.style.position = "fixed"
    expanded_img.style.paddingBottom = "100px"
    expanded_img.style.marginLeft = "400px"
}






