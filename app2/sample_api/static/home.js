var imageInput = document.getElementById('imageInput');
var preview = document.getElementById('preview');
var modified = document.getElementById('modified');
imageInput.onchange = function(){
    preview.src = "media/original.png";
    modified.src = "media/modified.png";
    document.getElementById("prev_img").innerHTML = "Preview image";
}


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


function submitImage1() {
    const preview = document.getElementById('preview');
    const modified = document.getElementById('modified');
    const imageInput = document.getElementById('imageInput'); 
    const download_link = document.getElementById('down_link'); 

    if (imageInput.files && imageInput.files[0]) 
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
            success : function(data) {
                console.log('success');
                // console.log(data);
                modified.src = 'data:image/png;base64,' + data;
                download_link.href = 'data:image/png;base64,' + data;

                // modified.src = '/home/poorna/Desktop/Meta Brix/webapp/app2/tracer/object/custom_dataset/test.png';
                // download_link.href = '/home/poorna/Desktop/Meta Brix/webapp/app2/tracer/object/custom_dataset/test.png';
            },
            error: function(data) {
                console.log('image-fail');
            }
        });
    }
}