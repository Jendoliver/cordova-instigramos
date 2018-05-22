<?php
header("access-control-allow-origin: *");
/**
 * Created by PhpStorm.
 * User: Jandol
 * Date: 05/21/2018
 * Time: 19:13
 */

require '../../model/InstagramoDAO.php';

$instagramoDAO = new InstagramoDAO();
$user = $instagramoDAO->login($_POST["username"], $_POST["password"]);

echo $user != null ? $user->getUsername() : "false";