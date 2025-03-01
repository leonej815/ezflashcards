<?php

$folder = $_GET['folder'];
$file = $_GET['file'];

$path = 'json/'.$folder.'/'.$file.'.json';

$jsonStr = file_get_contents($path);

echo $jsonStr;