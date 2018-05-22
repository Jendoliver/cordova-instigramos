let WS = "https://instigramos.000webhostapp.com/";
let options;
let fileTransfer;
var uploadImgUri = "";

$(document).ready(function()
{
    // Check logged user
    if(localStorage.getItem("username") == null)
        window.location.href = "login.html";

    // Examen (quick photo)
    if(localStorage.getItem("quickphoto") !== "")
    {
        askPhotoHashtags(localStorage.getItem("quickphoto"));
        // After quickphoto recovery, we get rid of the cache
        localStorage.setItem("quickphoto", "");
    }

    // Examen (change password)
    $("#changePasswordOption").click(function () {
        $("#changePasswordModal").modal("show");
    });
    $("#changePassword").click(changePassword);

    // Prepare gallery filter
    let filterBtn = $(".filter-button");
    filterBtn.click(filterImages);
    if (filterBtn.removeClass("active")) {
        $(this).removeClass("active");
    }
    $(this).addClass("active");

    // Load all images
    loadImages();

    // Prepare picture events
    $("#everything").click(loadImages);
    $("#takepic").click(takePicture);
    $("#selectpic").click(loadImageFromGallery)

    // Prepare FTP classes
    document.addEventListener("deviceready", initializeOptions, false);

    $("#logout").click(logout);
});

function changePassword()
{
    $.ajax({
        type: "POST",
        url: WS + "service/ajax/change_password.php",
        data: { username: localStorage.getItem("username"),
            newPassword: $("#newPassword").val() },
        success: function(response)
        {
            if(response === "true")
                alert("Password changed successfully!");
            else
                alert("There was an error while changing your password");
        }
    });
}

function loadImages()
{
    let imagesDiv = $(".images");
    imagesDiv.empty();

    $.ajax({
        method: "POST",
        url: WS + "service/ajax/find_all_pictures.php",
        success: function(response)
        {
            if(response !== "false")
            {
                console.log(response);
                let images = JSON.parse(response);
                console.log(images);

                for(let i in images)
                {
                    var newImage = $("<div class='gallery_product col-lg-4 col-md-4 col-sm-4 col-xs-5 filter'><img src='http://fakeimg.pl/365x365/' class='img-fluid'/></div>");;
                    newImage.find('.img-fluid').attr("src", images[i].uri);
                    if(images[i].user === localStorage.getItem("username"))
                        newImage.addClass("yours");
                    else
                        newImage.addClass("others");
                    imagesDiv.append(newImage);
                }
            }
        }
    });
}

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
    localStorage.setItem("username", "");
    window.location.href = "login.html";
}