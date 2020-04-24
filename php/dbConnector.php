<?php
class DBConnector{
	private $conn;
	private $dbname;
	private $user;
	private $db_connection;

	function __construct(){
		$user = "postgres";
		$dbname = "blogdb";
		#$db_connection = pg_connect("host=localhost dbname=blogdb user=postgres")
		#$this->startConnection($hostname, $user, $dbname);
	}

	public function startConnection(){
		$this->db_connection = pg_connect("dbname=blogdb user=postgres");
		return $this->db_connection;
	}

	private function closeConnection(){
		pg_close($this->db_connection);
	}

}
