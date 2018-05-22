<?php
/**
 * Created by PhpStorm.
 * User: Jandol
 * Date: 05/21/2018
 * Time: 18:15
 */

require 'User.php';
require 'Picture.php';

class InstagramoDAO
{
    private $dbname = "id5861495_instagramo";
    private $dburl = "localhost";
    private $dbuser = "id5861495_instagramo";
    private $dbpass = "instagramo";

    public function login(string $username, string $password): ?User
    {
        $con = $this->connect();
        $query = "SELECT * FROM user WHERE username = '".$username."';";
        $res = $con->query($query);
        $con->close();
        if ($res->num_rows > 0)
        {
            $row = $res->fetch_assoc();
            if (password_verify($password, $row["password"]))
            {
                return User::create()->setUsername($row["username"])->setEmail($row["email"]);
            }
        }
        return null;
    }

    public function register(User $user, string $password): bool
    {
        $con = $this->connect();
        $query = "INSERT INTO user VALUES ('"
            .$user->getUsername()."', '"
            .$user->getEmail()."', '"
            .password_hash($password, PASSWORD_DEFAULT)."');";
        if($con->query($query))
        {
            $con->close();
            return true;
        }
        $con->close();
        return false;
    }

    public function store(Picture $picture): bool
    {
        $con = $this->connect();
        $pictureId = $this->getLastPictureId() + 1;
        $query = "INSERT INTO picture VALUES ("
            .$pictureId.", '"
            .$picture->getUri()."', '"
            .$picture->getUser()."');";
        if( ! $con->query($query))
        {
            $con->close();
            return false;
        }

        $hashtags = $picture->getHashtags();
        if(count($hashtags) == 0)
        {
            $con->close();
            return true;
        }
        $query = "INSERT INTO picture_has_hashtag VALUES ";
        $index = 1;
        foreach ($hashtags as $hashtag)
        {
            $query .= "(".$pictureId.", '".$hashtag."')";
            if($index != count($hashtags))
                $query .= ", ";
        }
        $query .= ";";
        echo $query;
        if( ! $con->query($query))
        {
            $con->close();
            return false;
        }
        return true;
    }

    public function getLastPictureId(): int
    {
        $con = $this->connect();
        $query = "SELECT max(id) AS maxid FROM picture;";
        $res = $con->query($query);
        $con->close();
        if ($res->num_rows > 0)
        {
            $row = $res->fetch_assoc();
            return $row["maxid"];
        }
        return 0;
    }

    public function findPictures(): array
    {
        $con = $this->connect();
        $query = "SELECT * FROM picture;";
        $res = $con->query($query);

        $pictures = array();
        while ($row = $res->fetch_assoc())
        {
            $picture = Picture::create()
                ->setUser($row["uploader_username"])
                ->setUri($row["uri"]);

            $pictures[] = array('user' => $picture->getUser(), 'uri' => $picture->getUri());
        }

        $con->close();
        return $pictures;
    }

    public function findPicturesWithHashtag(string $hashtag)
    {
        $con = $this->connect();
        $query = "SELECT * FROM picture WHERE id IN (
                    SELECT picture_id FROM picture_has_hashtag
                    WHERE hashtag = $hashtag
                  );";
        $res = $con->query($query);

        $pictures = array();
        while ($row = $res->fetch_assoc())
        {
            $pictures[] = Picture::create()->setUser(User::create()->setUsername($row["uploader_username"]))
                ->setUri($row["uri"]);
        }
        $con->close();
        return $pictures;
    }

    private function connect(): mysqli
    {
        $mysqli = new mysqli($this->dburl, $this->dbuser, $this->dbpass, $this->dbname);
        if ($mysqli->connect_errno)
            echo "Error connecting to MySQL: " . $mysqli->connect_error;
        return $mysqli;
    }
}