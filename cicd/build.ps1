$registry = "ghcr.io/pausedmagician/pawzd.net"
$version = npm pkg get version
$version = $version.replace('"','')

Write-Output ${registry}:v${version}

docker build -t ${registry}:v${version} -t ${registry}:latest .

docker push ${registry}:v${version} && docker push ${registry}:latest
