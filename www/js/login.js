let WS = "https://instigramos.000webhostapp.com/";

$(document).ready(function()
{
    // Clear quickphoto cache on init
    localStorage.setItem("quickphoto", "");

    trySessionLogin();

    $('#login-form-link').click(function(e)
    {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

    $('#register-form-link').click(function(e)
    {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

    $("#login-submit").click(submitLogin);
    $("#register-submit").click(submitRegister);

    // Examen
    $("#searchAllUsers").click(loadAllUsers);
    $("#quickPhoto").click(quickPhoto);
});

function loadAllUsers()
{
    var usersTable = $("#allUsers");
    usersTable.empty();

    $.ajax({
        method: "POST",
        url: WS + "service/ajax/find_all_users.php",
        success: function(response)
        {
            if(response !== "false")
            {
                console.log(response);
                let users = JSON.parse(response);
                console.log(users);

                for(let i in users)
                {
                    usersTable.append($("<tr><td>"+users[i].username+"</td><td>"+users[i].email+"</td></tr>"));
                }
            }
        }
    });
}

function quickPhoto()
{
    // Retrieve image file location from specified source
    navigator.camera.getPicture(savePhotoForQuickLoading,
        function(message) { alert('Picture cancelled'); },
        { quality: 50,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.CAMERA }
    );
}

function savePhotoForQuickLoading(imageURI)
{
    uploadImgUri = imageURI;
    $("#quickPhotoImage").attr("src", imageURI);
    localStorage.setItem("quickphoto", imageURI);
}

function showFeedback( text )
{
    $(".feedback-text").html( text );
}

function trySessionLogin()
{
    if(localStorage.getItem("username") !== "")
        window.location.href = "home.html";
}

function submitLogin()
{
    $.ajax({
        type: "POST",
        url: WS + "service/ajax/login.php",
        data: { username: $("#login-username").val(),
                password: $("#login-password").val() },
        success: function(response)
        {
            if(response === "false")
                showFeedback("Bad credentials");
            else
            {
                localStorage.setItem("username", response);
                window.location.href = "home.html";
            }
        }
    });
}

function submitRegister()
{
    let regPass = $("#register-password").val();
    if(regPass === $("#register-confirm-password").val())
    $.ajax({
        type: "POST",
        url: WS + "service/ajax/register.php",
        data: { username: $("#register-username").val(),
                email: $("#register-email").val(),
                password: regPass },
        success: function(response)
        {
            if(response === "false")
                showFeedback("The user already exists");
            else
            {
                localStorage.setItem("username", response);
                window.location.href = "home.html";
            }
        }
    });
}