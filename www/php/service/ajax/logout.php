<?php
header("access-control-allow-origin: *");
/**
 * Created by PhpStorm.
 * User: Jandol
 * Date: 05/21/2018
 * Time: 19:36
 */

session_start();
session_unset();
session_destroy();

echo "true";