<?php
/**
 * Created by PhpStorm.
 * User: Jandol
 * Date: 05/22/2018
 * Time: 18:13
 */

require '../../model/InstagramoDAO.php';

$instagramoDAO = new InstagramoDAO();
$user = User::create()->setUsername($_POST["username"]);
$couldChangePassword = $instagramoDAO->changePassword($user, $_POST["newPassword"]);

echo $couldChangePassword ? "true" : "false";