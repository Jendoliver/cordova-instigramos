<?php
/**
 * Created by PhpStorm.
 * User: Jandol
 * Date: 05/21/2018
 * Time: 18:36
 */

class User
{
    private $username;
    private $email;

    private function __construct() { }
    public static function create()                 { $instance = new self(); return $instance; }

    // Getters
    public function getUsername()                   { return $this->username; }
    public function getEmail()                      { return $this->email; }

    // Setters
    public function setUsername($newUsername)       { $this->username = $newUsername; return $this; }
    public function setEmail($newEmail)             { $this->email = $newEmail; return $this; }
}