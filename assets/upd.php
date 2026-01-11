<?php
$version="2.0";
$updateInfo="• 新增 弹窗配置";
$zipUrl="https://i8os.github.io/app/assets/app.zip";

header("Content-Type:application/json;charset=utf-8");
header("Access-Control-Allow-Origin:*");
echo json_encode([
"bb"=>$version,
"nr"=>$updateInfo,
"url"=>$zipUrl
],JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
?>
