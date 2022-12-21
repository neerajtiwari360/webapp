var imageInput = document.getElementById('imageInput');
var preview = document.getElementById('preview');
var modified = document.getElementById('modified');
var flag = 0
imageInput.onchange = function(){
    preview.src = "media/original.png";
    modified.src = "media/modified.png";
    document.getElementById("prev_img").innerHTML = "Preview image";
    flag = 0;
}
bg_func();


function previewImage() {
    const preview = document.getElementById('preview');
    const modified = document.getElementById('modified');
    const imageInput = document.getElementById('imageInput');

    // console.log(preview.src);
    // console.log(window.location.origin.concat('/media/original.png'));

    if(preview.src == window.location.origin.concat('/media/original.png'))
    {
        console.log("!!!!");
        console.log(imageInput.files[0]);
        
        // Make sure a file was selected
        if (imageInput.files && imageInput.files[0]) {
            const reader = new FileReader();

            // Set the preview image source
            reader.onload = function (e) {
                preview.src = e.target.result;
            }
            reader.readAsDataURL(imageInput.files[0]);

            // Show the preview image
            preview.style.display = "block";

            document.getElementById("prev_img").innerHTML = "Clear preview";
        }  
    }
    else
    {
        console.log("@@@@");
        preview.src = window.location.origin.concat('/media/original.png');
        modified.src = window.location.origin.concat('/media/modified.png');
        document.getElementById("prev_img").innerHTML = "Preview image";
    }  
}


function submitImage1(bg_num, img_src) {
    const preview = document.getElementById('preview');
    const modified = document.getElementById('modified');
    const imageInput = document.getElementById('imageInput'); 
    const download_link1 = document.getElementById('down_link1'); 
    const download_link2 = document.getElementById('down_link2'); 

    if (imageInput.files && imageInput.files[0]) 
    {
        if (flag == 0)
        {
            const reader = new FileReader();

            // Set the preview image source
            reader.onload = function (e) {preview.src = e.target.result;}
            reader.readAsDataURL(imageInput.files[0]);
            preview.style.display = "block";

            // Send the image file as the request body
            var formData = new FormData();
            var img_data = imageInput.files[0];

            console.log(img_data);
            console.log("temp");
            formData.append('image', img_data);
            formData.append('test', "temp");

            console.log("--------");
            for (var key of formData.entries()) {
                console.log(key[0] + ', ' + key[1]);
            }
            console.log("--------");

            $.ajax({
                url         : "/submit1/",
                type        : 'POST',
                data        : formData,
                cache       : false,
                contentType : false,
                processData : false,
                success : function(response) {
                    console.log('success');
                    // console.log(data);
                    modified.src = 'data:image/png;base64,' + response.data;
                    download_link1.href = 'data:image/png;base64,' + response.data;
                    download_link2.href = 'data:image/png;base64,' + response.mask;
                },
                error: function(data) {
                    console.log('image-fail');
                }
            });
            flag = 1;
        }
        
        var formData = new FormData();
        formData.append('bg_num', bg_num);
        formData.append('img_src', img_src);

        console.log("--------");
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        console.log("--------");

        $.ajax({
            url         : "/change_bg/",
            type        : 'POST',
            data        : formData,
            cache       : false,
            contentType : false,
            processData : false,
            success : function(response) {
                console.log('success');
                // console.log(response.data);
                modified.src = 'data:image/png;base64,' + response.data;
                download_link1.href = 'data:image/png;base64,' + response.data;
            },
            error: function(data) {
                console.log('image-fail');
            }
        });   
    }
}

function bg_func() {
    let buttons = document.querySelectorAll(".bg_img_but");
    console.log(buttons);
    buttons.forEach((btn, index) => {
        btn.addEventListener("click", bg_onclick, false);
    })
}

var bg_onclick = function(event) {
    console.log(event.target.src);
    console.log(this, this.value);
    submitImage1(this.value, event.target.src);
};