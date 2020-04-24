<?php
class DBConnector{
	private $dbname;
	private $user;
	private $db_connection;

	function __construct($usr, $dbn){
		#$this->user = $usr;
		#$this->dbname = $dbn;
		$this->setDBName($dbn);
		$this->setUser($usr);
	}

	public function startConnection(){
		$loginString = "dbname=".$this->dbname." user=".$this->user;
		#$this->db_connection = pg_connect("dbname=blogdb user=postgres");
		$this->db_connection = pg_connect($loginString);
		return $this->db_connection;
	}

	public function closeConnection(){
		pg_close($this->db_connection);
	}

	private function setDBName($name){
		$this->dbname = $name;
	}

	private function setUser($name){
		$this->user = $name;
	}
}
