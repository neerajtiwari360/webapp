document.getElementById('videoInput').addEventListener('change', function() {
  var video = this.files[0];
  var reader = new FileReader();
  var progressBar = document.getElementById('prog_bar');
  var upload_prog = document.getElementById('upload_prog');

  reader.onloadstart = function() {
    progressBar.style.width = '0%';
    upload_prog.innerText = "Upload Progress : ".concat(video.name);
  }

  reader.onprogress = function(e) {
    if (e.lengthComputable) {
      var percentLoaded = Math.round((e.loaded / e.total) * 100);
      progressBar.style.width = percentLoaded + '%';
      progressBar.setAttribute('aria-valuenow', percentLoaded);
    }
  }

  reader.onloadend = function() {
    progressBar.style.width = '100%';
  }

  reader.readAsDataURL(video);
});

function create_frames() {
    const video_inp = document.getElementById('videoInput');
    const frameInput = document.getElementById('frameInput');

    const progressBar = document.getElementById('prog_bar');
    const upload_prog = document.getElementById('upload_prog');
    const form1 = document.getElementById('form1');

    const generate = document.getElementById('generate_id');
    const first_img = document.getElementById('first_img');
    const down_link = document.getElementById('down_link2');
        
    // Make sure a file was selected
    if (video_inp.files && video_inp.files[0]) {
        generate.innerText = "Frames Generation : In Progress";

        const reader = new FileReader();

        // Set the preview image source
        reader.onload = function (e) {console.log("Video loaded!");}
        reader.readAsDataURL(video_inp.files[0]);

        // Send the image file as the request body
        var formData = new FormData();
        var video_data = video_inp.files[0];

        console.log(video_data);
        formData.append('video', video_data);
        formData.append('no_frames', frameInput.value)

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
                console.log('success1');
                console.log(response);
                progressBar.style.width = '0%';
                upload_prog.innerText = "Upload Progress : ";
                form1.reset();

                if(response.error == '') {
                    generate.innerText = "Frames Generation : Completed";
                    first_img.src = window.location.origin.concat(response.first_img);
                    down_link.href = window.location.origin.concat(response.zip_file);
                }
                else {
                    generate.innerText = "Frames Generation : ".concat(response.error);
                }
            },
            error: function(data) {
                console.log('image-fail1');
            }
        });
    } 
}