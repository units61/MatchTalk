# Dockerfile koruma komutu
# Şablon: ops/Dockerfile.template
# Kullanım: PowerShell'de bu dosyanın bulunduğu klasörde
#   ./restore-dockerfile.ps1
# veya proje kökünden
#   powershell -ExecutionPolicy Bypass -File ops/restore-dockerfile.ps1

$projectRoot = Split-Path -Parent $PSScriptRoot
$templatePath = Join-Path $projectRoot "ops" | Join-Path -ChildPath "Dockerfile.template"
$targetPath = Join-Path $projectRoot "Dockerfile"

if (-not (Test-Path $templatePath)) {
  Write-Error "Şablon bulunamadı: $templatePath"
  exit 1
}

if (-not (Test-Path $targetPath)) {
  Copy-Item $templatePath $targetPath -Force
  Write-Output "Dockerfile şablondan oluşturuldu."
  exit 0
}

$templateHash = Get-FileHash $templatePath
$targetHash = Get-FileHash $targetPath

if ($templateHash.Hash -ne $targetHash.Hash) {
  Copy-Item $templatePath $targetPath -Force
  Write-Output "Dockerfile şablondan güncellendi."
} else {
  Write-Output "Dockerfile zaten güncel."
}


