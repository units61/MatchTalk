# ============================================
# MatchTalk Backend - Deployment Script (PowerShell)
# ============================================
# 
# Bu script production ortamında deployment yapmak için kullanılır.
# Windows PowerShell için uyarlanmış versiyon.
# 
# Kullanım:
#   .\scripts\deploy.ps1 [environment]
# 
# Örnek:
#   .\scripts\deploy.ps1 production
# ============================================

param(
    [string]$Environment = "production"
)

$ErrorActionPreference = "Stop"

# Configuration
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectDir = Split-Path -Parent $ScriptDir
$LogFile = Join-Path $ProjectDir "logs\deploy.log"

# Create logs directory if it doesn't exist
if (-not (Test-Path (Split-Path $LogFile -Parent))) {
    New-Item -ItemType Directory -Path (Split-Path $LogFile -Parent) -Force | Out-Null
}

# Logging functions
function Write-Log {
    param([string]$Message)
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $LogMessage = "[$Timestamp] $Message"
    Write-Host $LogMessage -ForegroundColor Green
    Add-Content -Path $LogFile -Value $LogMessage
}

function Write-Error-Log {
    param([string]$Message)
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $LogMessage = "[$Timestamp] ERROR: $Message"
    Write-Host $LogMessage -ForegroundColor Red
    Add-Content -Path $LogFile -Value $LogMessage
    exit 1
}

function Write-Warning-Log {
    param([string]$Message)
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $LogMessage = "[$Timestamp] WARNING: $Message"
    Write-Host $LogMessage -ForegroundColor Yellow
    Add-Content -Path $LogFile -Value $LogMessage
}

Write-Log "Starting deployment for environment: $Environment"
Write-Log "Project directory: $ProjectDir"

# Change to project directory
Set-Location $ProjectDir

# ============================================
# Pre-deployment checks
# ============================================
Write-Log "Running pre-deployment checks..."

# Check if Node.js is installed
try {
    $NodeVersion = node -v
    Write-Log "Node.js version: $NodeVersion"
} catch {
    Write-Error-Log "Node.js is not installed. Please install Node.js 20 or higher."
}

# Check Node.js version (should be 20+)
$NodeMajorVersion = (node -v).Substring(1).Split('.')[0]
if ([int]$NodeMajorVersion -lt 20) {
    Write-Error-Log "Node.js version 20 or higher is required. Current version: $(node -v)"
}

# Check if PM2 is installed
try {
    pm2 -v | Out-Null
    Write-Log "PM2 is installed"
} catch {
    Write-Warning-Log "PM2 is not installed. Installing PM2 globally..."
    npm install -g pm2
}

# Check if .env file exists
$EnvFile = ".env.$Environment"
if (-not (Test-Path $EnvFile)) {
    $EnvFile = ".env"
    if (-not (Test-Path $EnvFile)) {
        Write-Error-Log "Environment file (.env.$Environment or .env) not found. Please create it from .env.production.example"
    }
}

# Load environment variables (basic check)
if (Test-Path $EnvFile) {
    Get-Content $EnvFile | ForEach-Object {
        if ($_ -match '^\s*([^#][^=]+)=(.*)$') {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim()
            [Environment]::SetEnvironmentVariable($key, $value, "Process")
        }
    }
}

if (-not $env:DATABASE_URL) {
    Write-Error-Log "DATABASE_URL is not set in environment file"
}

if (-not $env:JWT_SECRET -or $env:JWT_SECRET -eq "CHANGE_ME") {
    Write-Error-Log "JWT_SECRET is not set or is using default value. Please set a strong secret."
}

Write-Log "Pre-deployment checks passed ✓"

# ============================================
# Backup current deployment (if exists)
# ============================================
$Pm2List = pm2 jlist | ConvertFrom-Json
if ($Pm2List | Where-Object { $_.name -eq "matchtalk-backend" }) {
    Write-Log "Backing up current PM2 process list..."
    pm2 save
    if ($LASTEXITCODE -ne 0) {
        Write-Warning-Log "Failed to save PM2 process list"
    }
}

# ============================================
# Install dependencies
# ============================================
Write-Log "Installing dependencies..."
npm ci --omit=dev --ignore-scripts
if ($LASTEXITCODE -ne 0) {
    Write-Error-Log "Failed to install dependencies"
}

# ============================================
# Generate Prisma Client
# ============================================
Write-Log "Generating Prisma Client..."
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Error-Log "Failed to generate Prisma Client"
}

# ============================================
# Run database migrations
# ============================================
Write-Log "Running database migrations..."
$RunMigrations = Read-Host "Do you want to run database migrations? (y/N)"
if ($RunMigrations -eq "y" -or $RunMigrations -eq "Y") {
    npx prisma migrate deploy
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Log "Failed to run database migrations"
    }
    Write-Log "Database migrations completed ✓"
} else {
    Write-Warning-Log "Skipping database migrations"
}

# ============================================
# Build application
# ============================================
Write-Log "Building application..."
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error-Log "Failed to build application"
}
Write-Log "Build completed ✓"

# ============================================
# Health check before restart
# ============================================
Write-Log "Performing health check..."
$CurrentProcess = $Pm2List | Where-Object { $_.name -eq "matchtalk-backend" }
if ($CurrentProcess) {
    $CurrentPort = if ($CurrentProcess.pm2_env.PORT) { $CurrentProcess.pm2_env.PORT } else { 4000 }
    try {
        $Response = Invoke-WebRequest -Uri "http://localhost:$CurrentPort/health" -TimeoutSec 5 -UseBasicParsing
        if ($Response.StatusCode -eq 200) {
            Write-Log "Current instance is healthy ✓"
        }
    } catch {
        Write-Warning-Log "Current instance health check failed, but continuing deployment..."
    }
}

# ============================================
# Restart application with PM2
# ============================================
Write-Log "Restarting application with PM2..."

if ($Pm2List | Where-Object { $_.name -eq "matchtalk-backend" }) {
    # Reload existing process (zero-downtime)
    Write-Log "Reloading existing PM2 process (zero-downtime)..."
    pm2 reload ecosystem.config.js --env $Environment
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Log "Failed to reload PM2 process"
    }
} else {
    # Start new process
    Write-Log "Starting new PM2 process..."
    pm2 start ecosystem.config.js --env $Environment
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Log "Failed to start PM2 process"
    }
}

# Save PM2 process list
pm2 save
if ($LASTEXITCODE -ne 0) {
    Write-Warning-Log "Failed to save PM2 process list"
}

Write-Log "PM2 process restarted ✓"

# ============================================
# Post-deployment health check
# ============================================
Write-Log "Waiting for application to start..."
Start-Sleep -Seconds 5

Write-Log "Performing post-deployment health check..."
$MaxRetries = 10
$RetryCount = 0
$HealthCheckPassed = $false

while ($RetryCount -lt $MaxRetries) {
    try {
        $Response = Invoke-WebRequest -Uri "http://localhost:4000/health" -TimeoutSec 5 -UseBasicParsing
        if ($Response.StatusCode -eq 200) {
            $HealthCheckPassed = $true
            break
        }
    } catch {
        $RetryCount++
        Write-Log "Health check attempt $RetryCount/$MaxRetries failed, retrying in 2 seconds..."
        Start-Sleep -Seconds 2
    }
}

if ($HealthCheckPassed) {
    Write-Log "Health check passed ✓"
} else {
    Write-Error-Log "Health check failed after $MaxRetries attempts. Please check the logs: pm2 logs matchtalk-backend"
}

# ============================================
# Display deployment summary
# ============================================
Write-Log "Deployment completed successfully! ✓"
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Deployment Summary" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Environment: $Environment"
$Status = (pm2 jlist | ConvertFrom-Json | Where-Object { $_.name -eq "matchtalk-backend" }).pm2_env.status
Write-Host "Status: $Status"
$Instances = (pm2 jlist | ConvertFrom-Json | Where-Object { $_.name -eq "matchtalk-backend" }).Count
Write-Host "Instances: $Instances"
Write-Host ""
Write-Host "Useful commands:" -ForegroundColor Yellow
Write-Host "  pm2 logs matchtalk-backend    - View logs"
Write-Host "  pm2 monit                      - Monitor processes"
Write-Host "  pm2 status                    - View status"
Write-Host "  pm2 restart matchtalk-backend - Restart application"
Write-Host "============================================" -ForegroundColor Cyan



