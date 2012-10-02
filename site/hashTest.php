<?php
$algos = hash_algos();
$compressed = hash('adler32','Compress me',false);
echo $compressed;
?>