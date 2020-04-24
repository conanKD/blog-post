<?php
  include 'dbConnector.php';
  class Post{
    public $db;
    function __construct(){
      $this->db = new DBConnector("postgres", "blogdb");
      $this->conn = $this->db->startConnection();
    }

    public function loadPostPrev(){
      $query = pg_query($this->conn, "SELECT id, title, prev FROM post");
      $result = pg_fetch_all($query);
      return json_encode($result);
    }

    public function loadPost($id){
      # Noch injection abfangen!!!!
      $id = intval($id);
      pg_prepare($this->conn, 'loadPost', "SELECT * from post where id = $1");
      $result = pg_fetch_all(pg_execute($this->conn, 'loadPost', array(strval($id))));
      return json_encode($result);
    }
  }
  if($_POST["functionname"]){
    $post = new Post();
    if ($_POST["functionname"] == "loadAllPosts") {
      echo $post->loadPostPrev();
    }else if($_POST["functionname"] == "loadPost"){
      echo $post->loadPost($_POST["id"]);
    }
    $post->db->closeConnection();
  }
?>
