<?php
//connecting to the database
$servername = "localhost";
$username = "root";
$password = "";
$database = "dbshuvo";

//Create a connection
$conn = mysqli_connect($servername, $username, $password, $database);

//Die if connection was not succesful
if (!$conn) {
    die("Sorry we failed to connect: ". mysqli_connect_error());
}else{
    echo "Connection was successful<br>";
}
?>