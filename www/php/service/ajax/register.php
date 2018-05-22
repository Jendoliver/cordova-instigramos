<?php
header("access-control-allow-origin: *");
/**
 * Created by PhpStorm.
 * User: Jandol
 * Date: 05/21/2018
 * Time: 19:43
 */

require '../../model/InstagramoDAO.php';

$instagramoDAO = new InstagramoDAO();
$user = User::create()->setUsername($_POST["username"])->setEmail($_POST["email"]);
$couldRegister = $instagramoDAO->register($user, $_POST["password"]);

echo $couldRegister ? $user->getUsername() : "false";