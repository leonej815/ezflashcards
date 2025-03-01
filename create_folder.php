<?php

$folderName = $_GET['folderName'];

$jsonFolder = 'json';
if (is_dir($jsonFolder) === False) {
    mkdir($jsonFolder);
}

$newFolderPath = $jsonFolder . '/' . $folderName;




// check if folder exixts
$currentFolders = scandir($jsonFolder);
foreach ($currentFolders as $folder) {
    if ($folder === '.' or $folder === '..') continue;

    if (is_dir($jsonFolder . '/' . $folder)) {
        if(strtolower($folder) === strtolower($folderName)){
            echo 'Folder already exists';
            exit();
        }
    }
}

mkdir($newFolderPath);
echo json_encode([0]);