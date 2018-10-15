$(document).ready(function() {
    $('#submit_handlr').click(function() {
        console.log("Submit is Clicked");
        var file = document.getElementById("img").files[0];
        var filter = document.getElementById("filter").value;
        var formdata = new FormData();
        formdata.append("file",file);
        formdata.append("filter", filter);
        //console.log(file.name);
        $.ajax({
            url: "/",
            method: "POST",
            data: formdata,
            contentType: false,
            processData: false,
            success: (res) => {
                console.log("success");
                console.log(res.file);
                $('#filtered').html("<img height=400 width=400 src='" + res.file + "'>")
            },
            error: (res) => {
                console.log(res);
            }

        });
    });

});