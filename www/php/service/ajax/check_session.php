<?php
header("access-control-allow-origin: *");
/**
 * Created by PhpStorm.
 * User: Jandol
 * Date: 05/21/2018
 * Time: 19:32
 */

// Checks if the user was already logged in
echo isset($_SESSION["username"]) ? "true" : "false";