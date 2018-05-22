let WS = "https://instigramos.000webhostapp.com/";

$(document).ready(function()
{
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
});

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