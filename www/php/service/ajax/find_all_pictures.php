<?php
/**
 * Created by PhpStorm.
 * User: Jandol
 * Date: 05/22/2018
 * Time: 15:26
 */
require '../../model/InstagramoDAO.php';

$instagramoDAO = new InstagramoDAO();
$pictures = $instagramoDAO->findPictures();

if(empty($pictures))
    echo "false";
else
    echo json_encode($pictures);