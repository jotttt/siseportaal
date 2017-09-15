<?php
$json = $_POST['videos'];
echo $json;
//var_dump(json_decode($json, true));

$fp = fopen("html_list.json", "w") or die("cant open file");
fwrite($fp, $json);
fclose($fp);
?>
