let WS = "https://instigramos.000webhostapp.com/";
let options;
let fileTransfer;
var uploadImgUri = "";

$(document).ready(function()
{
    // Check logged user
    if(localStorage.getItem("username") == null)
        window.location.href = "login.html";

    // Prepare gallery filter
    let filterBtn = $(".filter-button");
    filterBtn.click(filterImages);
    if (filterBtn.removeClass("active")) {
        $(this).removeClass("active");
    }
    $(this).addClass("active");

    // Prepare picture events
    $("#takepic").click(takePicture);
    $("#selectpic").click(loadImageFromGallery)

    // Prepare FTP classes
    document.addEventListener("deviceready", initializeOptions, false);

    $("#logout").click(logout);
});

function filterImages()
{
    let value = $(this).attr('data-filter');
    let filter = $('.filter');

    if(value === "all")
    {
        filter.show('1000');
    }
    else
    {
        filter.not('.'+value).hide('3000');
        filter.filter('.'+value).show('3000');
    }
}

function takePicture()
{
    // Retrieve image file location from specified source
    navigator.camera.getPicture(askPhotoHashtags,
        function(message) { alert('Picture cancelled'); },
        { quality: 50,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.CAMERA }
    );
}

function loadImageFromGallery()
{
    // Retrieve image file location from specified source
    navigator.camera.getPicture(askPhotoHashtags,
        function(message) { alert('Picture cancelled'); },
        { quality: 50,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY }
    );
}

function initializeOptions()
{
    options = new FileUploadOptions();
    options.fileKey = "file";
    options.mimeType = "image/jpeg";
    options.chunkedMode = false;
    fileTransfer = new FileTransfer();
}

function askPhotoHashtags(imageURI)
{
    uploadImgUri = imageURI;
    $("#uploadImagePreview").attr("src", imageURI);
    $("#uploadImageModal").modal("show");
    $("#uploadImage").click(uploadPhoto);
}

function uploadPhoto()
{
    let hashtags = $("#hashtags").val().split(" ");
    console.log(hashtags);
    let params = {};
    params.hashtags = JSON.stringify(hashtags);
    params.username = localStorage.getItem("username");

    options.fileName=uploadImgUri.substr(uploadImgUri.lastIndexOf('/')+1);
    options.params = params;

    fileTransfer.upload(uploadImgUri, encodeURI(WS + "service/ajax/upload_picture.php"), win, fail, options);
}

function win(r)
{
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    alert("Image uploaded succesfully!");
    $("#uploadImageModal").modal("hide");
}

function fail(error)
{
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}

function logout()
{
    $.ajax({
        method: "POST",
        url: WS + "service/ajax/logout.php",
        success: function(response)
        {
            if(response === "true")
                window.location.href = "login.html";
        }
    });
}