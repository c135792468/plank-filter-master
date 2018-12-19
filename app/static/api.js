console.log("successfully imported")

$(() => {
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

    $('#get-album').on('click', () => {
        $.ajax({
            url: '/lobby_select_album',
            type: 'POST',
            data: $('#album-selection').serialize(),
            success: (res) => {
                console.log("response for select labum");
                $('#album_imgs').empty()

                let images = res.imgs

                for(let img in images){
                    let new_img = document.createElement("img")

                    new_img.src = '/static/imgs/' + images[img]
                    new_img.style.cursor = 'pointer'
                    new_img.style.backgroundSize = "cover"
                    new_img.style.backgroundPosition = "center"
                    new_img.height = 130
                    new_img.width = 130
                    // new_img.style.paddingTop = 20
                    new_img.style.margin = "auto"
                    

                    $('#album_imgs').append(new_img)
                }
            }

        })
    })

    

})



