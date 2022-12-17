var imageInput = document.getElementById('imageInput');
var preview = document.getElementById('preview');
var modified = document.getElementById('modified');
imageInput.onchange = function(){
    preview.src = "media/original.png";
    modified.src = "media/modified.png";
}


function previewImage() {
    const preview = document.getElementById('preview');
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


        // var xhr = new XMLHttpRequest();
        // xhr.open('POST', '/test/');

        // // Set the content type to be 'application/x-www-form-urlencoded'
        // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        // // Add an event listener for when the request finishes
        // xhr.addEventListener('load', function() {
        //     // Get the modified image data from the server response
        //     var modifiedImageData = xhr.responseText;

        //     // Update the image on the page with the modified image
        //     modified.src = 'data:image/jpeg;base64,' + modifiedImageData;
        // });

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

        // xhr.send(formData);


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
                modified.src = 'data:image/jpeg;base64,' + data;
                download_link.href = 'data:image/jpeg;base64,' + data;
            },
            error: function(data) {
                console.log('image-fail');
            }
        });
    }
}

function submitImage2() {
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

        formData.append('image', img_data);
        formData.append('test', "temp");

        $.ajax({
            url         : "/submit2/",
            type        : 'POST',
            data        : formData,
            cache       : false,
            contentType : false,
            processData : false,
            success : function(data) {
                console.log('success');
                modified.src = 'data:image/jpeg;base64,' + data;
                download_link.href = 'data:image/jpeg;base64,' + data;
            },
            error: function(data) {
                console.log('image-fail');
            }
        });
    }
}