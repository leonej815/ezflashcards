<?php

$path = 'json';
$results = scandir($path);

$topics = [];

foreach ($results as $result) {
    if ($result === '.' or $result === '..') continue;

    if (is_dir($path . '/' . $result)) {
        array_push($topics, $result);      
    }
}

echo json_encode($topics);