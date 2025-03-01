<?php

$folder = $_GET['folder'];
$path = 'json/'.$folder.'/';

$files = [];

foreach (array_filter(glob($path . '*'), 'is_file') as $file)
{
    array_push($files, basename($file, '.json'));
}

echo json_encode($files);