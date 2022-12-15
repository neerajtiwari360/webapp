function previewImage() {
    const preview = document.getElementById('preview');
    const imageInput = document.getElementById('imageInput');

    console.log(preview.src);
    console.log(window.location.origin.concat('/media/original.png'));

    if(preview.src == window.location.origin.concat('/media/original.png'))
    {
        console.log("!!!!");
        
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
        // else
        // {
        //     preview.src = window.location.origin.concat('/media/original.png');
        // }
    }
    else
    {
        console.log("@@@@");
        preview.src = window.location.origin.concat('/media/original.png');
        document.getElementById("prev_img").innerHTML = "Preview image";
    }

    
}