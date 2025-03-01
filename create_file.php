<?php

$file = trim($_GET['file']);
$folder = $_GET['folder'];

$dirPath = 'json/' . $folder;
$newFilePath = 'json/' . $folder . '/' . $file . '.json';


// check if file not empty
if(strlen($file) === 0){
    echo 'Input is empty';
    exit();
}


// check if file exists
foreach (array_filter(glob($dirPath . '*'), 'is_file') as $file)
{
    if (strtolower($newFilePath) === strtolower(basename($file, '.json'))){
        echo 'File already exists';
        exit();
    }
}


// create file
fopen($newFilePath, "w");
echo json_encode([0]);