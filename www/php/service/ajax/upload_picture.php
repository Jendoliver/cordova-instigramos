<?php
/**
 * Created by PhpStorm.
 * User: Jandol
 * Date: 05/22/2018
 * Time: 4:16
 */

require '../../model/InstagramoDAO.php';

if (!isset($_FILES["file"]["type"]))
{
    echo "Unset files";
    return;
}
$validExtensions = array("jpeg", "jpg", "png");
$temporary = explode("/", $_FILES["file"]["type"]);
$fileExtension = end($temporary);
if (
    !(
        ($_FILES["file"]["type"] == "image/png")
        || ($_FILES["file"]["type"] == "image/jpg")
        || ($_FILES["file"]["type"] == "image/jpeg")
    ) || !($_FILES["file"]["size"] < 100000)
    || !(in_array($fileExtension, $validExtensions))
) //Approx. 100kb files can be uploaded.
{
    echo "Invalid file Size or Type";
    echo "\nFile type: ".$_FILES["file"]["type"];
    echo "\nFile extension: ".$fileExtension;
    echo "\nFile size: ".$_FILES["file"]["size"];
    return;
}
if ( !isset($_POST["hashtags"]) )
{
    echo "ERROR hashtags?";
    return;
}

$hashtags = json_decode($_POST['hashtags']);
$picture = Picture::create()->setUser($_POST["username"])->setHashtags($hashtags);
$fileName = Picture::generateRandomFileName();
$picturePath = "uploads/$fileName.$fileExtension";
$picture->setUri("https://instigramos.000webhostapp.com/$picturePath");
var_dump($hashtags);
var_dump($uploaderUser);
var_dump($picture);

print_r($hashtags);

if ($_FILES["file"]["error"] > 0)
{
    echo "Return Code: " . $_FILES["file"]["error"];
    return;
}

move_uploaded_file($_FILES['file']['tmp_name'], "../../$picturePath");

$instagramoDAO = new InstagramoDAO();
$instagramoDAO->store($picture);

echo "true";