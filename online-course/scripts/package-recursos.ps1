# Empaqueta handouts y starter para el curso online (M6, M8, M9).
# Ejecutar desde: online-course/scripts

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$exports = Join-Path (Join-Path $root "online-course") "exports"
$recursos = Join-Path (Join-Path $root "online-course") "recursos"
$starter = Join-Path (Join-Path $root "starter") "harnessed-app"
$handouts = Join-Path $root "handouts"

New-Item -ItemType Directory -Force -Path $exports | Out-Null

$mod06 = Join-Path (Join-Path (Join-Path $root "online-course") "modulos") "modulo-06-deepseek-oss"
$mod08dir = Join-Path (Join-Path (Join-Path $root "online-course") "modulos") "modulo-08-cursor"
$mod09 = Join-Path (Join-Path (Join-Path $root "online-course") "modulos") "modulo-09-arquitecturas"

function New-ZipFromPaths {
    param(
        [string]$ZipPath,
        [string[]]$Paths
    )
    if (Test-Path $ZipPath) { Remove-Item $ZipPath -Force }
    $temp = Join-Path $env:TEMP ("online-course-" + [guid]::NewGuid().ToString())
    New-Item -ItemType Directory -Path $temp | Out-Null
    try {
        foreach ($p in $Paths) {
            if (-not (Test-Path $p)) {
                Write-Warning "No existe: $p"
                continue
            }
            $name = Split-Path $p -Leaf
            Copy-Item -Path $p -Destination (Join-Path $temp $name) -Recurse -Force
        }
        Compress-Archive -Path (Join-Path $temp "*") -DestinationPath $ZipPath -Force
        Write-Host "OK $ZipPath"
    }
    finally {
        Remove-Item $temp -Recurse -Force -ErrorAction SilentlyContinue
    }
}

# M6 — handouts OSS
New-ZipFromPaths (Join-Path $exports "recursos-modulo-06.zip") @(
    (Join-Path $recursos "checklist-decision-oss.md"),
    (Join-Path $recursos "modelos-por-tarea-2026.md"),
    (Join-Path $mod06 "ejercicio.md"),
    (Join-Path $mod06 "demo-ollama-cursor.md")
)

# M8 — harness starter (sin node_modules) + handout
$starterTemp = Join-Path $env:TEMP ("harnessed-app-" + [guid]::NewGuid().ToString())
Copy-Item $starter $starterTemp -Recurse -Force
$nm = Join-Path $starterTemp "node_modules"
if (Test-Path $nm) { Remove-Item $nm -Recurse -Force }

$zip08 = Join-Path $exports "recursos-modulo-08.zip"
if (Test-Path $zip08) { Remove-Item $zip08 -Force }
Compress-Archive -Path $starterTemp -DestinationPath $zip08 -Force
Remove-Item $starterTemp -Recurse -Force

$zip08extra = Join-Path $env:TEMP "mod08-extra"
New-Item -ItemType Directory -Path $zip08extra | Out-Null
Copy-Item (Join-Path $handouts "01-harness-fundamentals.md") $zip08extra
Copy-Item (Join-Path $mod08dir "ejercicio.md") $zip08extra
# Re-zip with extras using temp merge
$merge08 = Join-Path $env:TEMP "mod08-merge"
New-Item -ItemType Directory -Path $merge08 | Out-Null
Expand-Archive $zip08 $merge08 -Force
Copy-Item (Join-Path $handouts "01-harness-fundamentals.md") $merge08
Copy-Item (Join-Path $mod08dir "ejercicio.md") $merge08
Remove-Item $zip08 -Force
Compress-Archive -Path (Join-Path $merge08 "*") -DestinationPath $zip08 -Force
Remove-Item $merge08, $zip08extra -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "OK $zip08"

# M9 — arquitectura + demos
New-ZipFromPaths (Join-Path $exports "recursos-modulo-09.zip") @(
    (Join-Path $recursos "arquitectura-recomendada.md"),
    (Join-Path $mod09 "ejercicio.md"),
    (Join-Path $mod09 "demo-mcp-workflow.md")
)

Write-Host "`nZIPs en: $exports"
