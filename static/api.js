console.log("successfully imported")

$(() => {
    $("#submit_handlr").on("click",() => {
        console.log("called")
        let fd = new FormData();
        let files = $('#img')[0].files[0];
        fd.append('file',files);
        fd.append('filter', $('#filter').val)

        $.ajax({
            url: '/filter',
            data: fd,
            type: 'POST',
            contentType: false,
            processData: false,
            success: (res) => {
                console.log("pppp ", res.file)
                $('#filtered').html("<img height=400 width=400 src='/./static/imgs/" + res.file + "'>")
            },
            error: (res) => {
                console.log(res)
            }
        }) 
    
    })
        
})



