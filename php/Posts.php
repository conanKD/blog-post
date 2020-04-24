<?php
  include 'dbConnector.php';
  class Post{
    private $conn;
    function __construct(){
      #$db = new DBConnector("postgres", "postdb");
      $db = new DBConnector();
      $this->conn = $db->startConnection();
    }

    public function loadPostPrev(){
      $query = pg_query($this->conn, "SELECT id, title, prev FROM post");
      $result = pg_fetch_all($query);
      return json_encode($result);
    }

    public function loadPosts($id){
      return;
    }
  }
  if($_POST["functionname"]){
    $post = new Post();
    if ($_POST["functionname"] == "loadAllPosts") {
      echo $post->loadPostPrev();
    }else if($_POST["functionname"] == "loadPost"){
      echo $post->loadPost($_POST["id"]);
    }
  }
?>
