<?php
/**
 * Created by PhpStorm.
 * User: Jandol
 * Date: 05/22/2018
 * Time: 1:46
 */

class Picture
{
    private $user;
    private $uri;
    private $hashtags;

    public function __construct() { }
    public static function create()                 { $instance = new self(); return $instance; }

    // Getters
    public function getUser(): string               { return $this->user; }
    public function getUri(): string                { return $this->uri; }
    public function getHashtags(): array            { return $this->hashtags; }

    // Setters
    public function setUser(string $newUser)        { $this->user = $newUser; return $this; }
    public function setUri(string $newUri)          { $this->uri = $newUri; return $this; }
    public function setHashtags(array $newHashtags) { $this->hashtags = $newHashtags; return $this; }

    public function addHashtag(string $hashtag)
    {
        $this->hashtags[] = $hashtag;
    }

    public static function generateRandomFileName($length = 50): string
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++)
        {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
}