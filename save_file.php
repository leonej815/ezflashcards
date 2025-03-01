<?php

$folder = $_POST['folder'];
$fileName = $_POST['fileName'];
$dataArr = $_POST['dataArr'];

$path = 'json/' . $folder . '/' . $fileName . '.json';

$f=fopen($path,'w');
fwrite($f,json_encode($dataArr));
fclose($f);


echo 0;