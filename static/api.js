console.log("successfully imported")

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
            headers:{
                'Cache-Control': "no-cache";
                'Cache-Control': "no-store";
            },
            success: (res) => {
                console.log("pppp ", res.file)
                $('#filtered').html("<img height=400 width=400 src='" + res.file + "'>")
            },
            error: (res) => {
                console.log(res)
            }
        }) 
    
    })
        
})



