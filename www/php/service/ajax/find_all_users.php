<?php
/**
 * Created by PhpStorm.
 * User: Jandol
 * Date: 05/22/2018
 * Time: 17:38
 */
require '../../model/InstagramoDAO.php';

$instagramoDAO = new InstagramoDAO();
$users = $instagramoDAO->findUsers();

if(empty($users))
    echo "false";
else
    echo json_encode($users);