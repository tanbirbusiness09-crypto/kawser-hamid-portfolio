$ErrorActionPreference = 'Stop'
$project = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$packageFile = Join-Path $project 'package.json'

if (-not (Test-Path -LiteralPath $packageFile)) {
  throw 'package.json missing. Please extract the WHOLE GitHub ZIP before running START-LOCAL.bat.'
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  throw 'Node.js is not installed. Install Node.js 22.12+ or Node.js 24 LTS from https://nodejs.org/'
}
if (-not (Get-Command npm.cmd -ErrorAction SilentlyContinue)) {
  throw 'npm is not installed. Reinstall Node.js with npm included.'
}
$versionString = (& node --version).Trim()
$major = [int]($versionString.TrimStart('v').Split('.')[0])
$minor = [int]($versionString.TrimStart('v').Split('.')[1])
if ($major -lt 20 -or ($major -eq 20 -and $minor -lt 19) -or ($major -eq 22 -and $minor -lt 12)) {
  throw ('Node.js version ' + $versionString + ' may not support Vite 7. Use Node.js 22.12+ or 24 LTS.')
}
Set-Location -LiteralPath $project
Write-Host ('Project: ' + $project) -ForegroundColor Cyan
Write-Host ('Node:    ' + $versionString) -ForegroundColor Cyan

if (-not (Test-Path -LiteralPath (Join-Path $project 'node_modules'))) {
  Write-Host 'Installing npm dependencies for the first run...' -ForegroundColor Yellow
  & npm.cmd install
  if ($LASTEXITCODE -ne 0) { throw ('npm install failed with exit code ' + $LASTEXITCODE) }
}

Write-Host ''
Write-Host 'LOCAL WEBSITE: http://localhost:5173/' -ForegroundColor Green
Write-Host 'Open this address in your browser. Press Ctrl+C here to stop.' -ForegroundColor Cyan
Write-Host 'Vite will now start and keep this terminal open...' -ForegroundColor Cyan
Write-Host ''
& npm.cmd run dev -- --host 127.0.0.1 --port 5173 --strictPort
if ($LASTEXITCODE -ne 0) { throw ('Vite stopped with exit code ' + $LASTEXITCODE) }
