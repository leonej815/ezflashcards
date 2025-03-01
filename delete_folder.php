<?php

$folder = $_GET['folder'];
$path = 'json/'.$folder;

// attempt to delete all files in directory
array_map('unlink', glob($path . '/*'));

// attempt to delete directory
$result = rmdir($path);

// check if directory deleted
if ($result === False){
    echo 'Folder couldn\'t be deleted';
}
else{
    echo 0;
}

