<?php

include_once("config.php");
session_start();
session_destroy();

$status         = 0;
$message        = "not set";

echo json_encode(array(
    'status' => $status,
    'message' => $message
));

mysql_close($db_connection);


?>