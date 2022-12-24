function previewImage() {
    const preview = document.getElementById('preview');
    const model = document.getElementById('model');
    const imageInput = document.getElementById('imageInput');
    const down_link = document.getElementById('down_link2');

    if(preview.src == window.location.origin.concat('/media/temp.png'))
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
        preview.src = window.location.origin.concat('/media/temp.png');
        down_link.href = window.location.origin.concat('/media/model.glb');
        model.src = window.location.origin.concat('/media/model.glb');
        document.getElementById("prev_img").innerHTML = "Preview image";
    }  
}

function create_model() {
    const img_inp = document.getElementById('imageInput');
    const form1 = document.getElementById('form1');
    const model = document.getElementById('model');
    const down_link = document.getElementById('down_link2');
        
    // Make sure a file was selected
    if (img_inp.files && img_inp.files[0]) {
        // Send the image file as the request body
        var formData = new FormData();
        var image_data = img_inp.files[0];

        console.log(image_data);
        formData.append('image', image_data);

        console.log("--------");
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        console.log("--------");

        $.ajax({
            url         : "/submit1/",
            type        : 'POST',
            data        : formData,
            async       : false,
            cache       : false,
            contentType : false,
            processData : false,
            success : function(response) {
                console.log('success1');
                console.log(response);
                down_link.href = window.location.origin.concat(response.model);
                model.src = window.location.origin.concat(response.model);
                form1.reset();
            },
            error: function(data) {
                console.log('image-fail1');
            }
        });
    } 
}