<?php
/**
 * Created by PhpStorm.
 * User: Jandol
 * Date: 05/22/2018
 * Time: 15:39
 */

$instagramoDAO = new InstagramoDAO();
echo json_encode($instagramoDAO->findPicturesWithHashtag($_POST["hashtag"]));