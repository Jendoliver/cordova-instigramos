<?php
/**
 * Created by PhpStorm.
 * User: Jandol
 * Date: 05/22/2018
 * Time: 19:07
 */
require '../../model/InstagramoDAO.php';

$instagramoDAO = new InstagramoDAO();
$couldRate = $instagramoDAO->rate(User::create()->setUsername($_POST["username"]), $_POST["pictureid"], $_POST["rating"]);
echo $couldRate;