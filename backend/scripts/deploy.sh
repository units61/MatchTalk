#!/bin/bash

# ============================================
# MatchTalk Backend - Deployment Script
# ============================================
# 
# Bu script production ortamında deployment yapmak için kullanılır.
# 
# Kullanım:
#   ./scripts/deploy.sh [environment]
# 
# Örnek:
#   ./scripts/deploy.sh production
# ============================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT=${1:-production}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
LOG_FILE="$PROJECT_DIR/logs/deploy.log"

# Create logs directory if it doesn't exist
mkdir -p "$PROJECT_DIR/logs"

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1" | tee -a "$LOG_FILE"
    exit 1
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING:${NC} $1" | tee -a "$LOG_FILE"
}

# Check if running as root (not recommended)
if [ "$EUID" -eq 0 ]; then 
   warn "Running as root is not recommended. Consider using a non-root user."
fi

log "Starting deployment for environment: $ENVIRONMENT"
log "Project directory: $PROJECT_DIR"

# Change to project directory
cd "$PROJECT_DIR"

# ============================================
# Pre-deployment checks
# ============================================
log "Running pre-deployment checks..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    error "Node.js is not installed. Please install Node.js 20 or higher."
fi

# Check Node.js version (should be 20+)
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    error "Node.js version 20 or higher is required. Current version: $(node -v)"
fi

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    warn "PM2 is not installed. Installing PM2 globally..."
    npm install -g pm2
fi

# Check if .env file exists
if [ ! -f ".env.$ENVIRONMENT" ] && [ ! -f ".env" ]; then
    error "Environment file (.env.$ENVIRONMENT or .env) not found. Please create it from .env.production.example"
fi

# Check if DATABASE_URL is set
if [ -f ".env.$ENVIRONMENT" ]; then
    source .env.$ENVIRONMENT
elif [ -f ".env" ]; then
    source .env
fi

if [ -z "$DATABASE_URL" ]; then
    error "DATABASE_URL is not set in environment file"
fi

if [ -z "$JWT_SECRET" ] || [ "$JWT_SECRET" = "CHANGE_ME" ]; then
    error "JWT_SECRET is not set or is using default value. Please set a strong secret."
fi

log "Pre-deployment checks passed ✓"

# ============================================
# Backup current deployment (if exists)
# ============================================
if pm2 list | grep -q "matchtalk-backend"; then
    log "Backing up current PM2 process list..."
    pm2 save || warn "Failed to save PM2 process list"
fi

# ============================================
# Install dependencies
# ============================================
log "Installing dependencies..."
npm ci --omit=dev --ignore-scripts || error "Failed to install dependencies"

# ============================================
# Generate Prisma Client
# ============================================
log "Generating Prisma Client..."
npx prisma generate || error "Failed to generate Prisma Client"

# ============================================
# Run database migrations
# ============================================
log "Running database migrations..."
read -p "Do you want to run database migrations? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npx prisma migrate deploy || error "Failed to run database migrations"
    log "Database migrations completed ✓"
else
    warn "Skipping database migrations"
fi

# ============================================
# Build application
# ============================================
log "Building application..."
npm run build || error "Failed to build application"
log "Build completed ✓"

# ============================================
# Health check before restart
# ============================================
log "Performing health check..."
if pm2 list | grep -q "matchtalk-backend"; then
    # Check if current instance is healthy
    CURRENT_PORT=$(pm2 jlist | jq -r '.[] | select(.name=="matchtalk-backend") | .pm2_env.PORT // 4000')
    if curl -f "http://localhost:$CURRENT_PORT/health" > /dev/null 2>&1; then
        log "Current instance is healthy ✓"
    else
        warn "Current instance health check failed, but continuing deployment..."
    fi
fi

# ============================================
# Restart application with PM2
# ============================================
log "Restarting application with PM2..."

if pm2 list | grep -q "matchtalk-backend"; then
    # Reload existing process (zero-downtime)
    log "Reloading existing PM2 process (zero-downtime)..."
    pm2 reload ecosystem.config.js --env "$ENVIRONMENT" || error "Failed to reload PM2 process"
else
    # Start new process
    log "Starting new PM2 process..."
    pm2 start ecosystem.config.js --env "$ENVIRONMENT" || error "Failed to start PM2 process"
fi

# Save PM2 process list
pm2 save || warn "Failed to save PM2 process list"

log "PM2 process restarted ✓"

# ============================================
# Post-deployment health check
# ============================================
log "Waiting for application to start..."
sleep 5

log "Performing post-deployment health check..."
MAX_RETRIES=10
RETRY_COUNT=0
HEALTH_CHECK_PASSED=false

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if curl -f "http://localhost:4000/health" > /dev/null 2>&1; then
        HEALTH_CHECK_PASSED=true
        break
    fi
    RETRY_COUNT=$((RETRY_COUNT + 1))
    log "Health check attempt $RETRY_COUNT/$MAX_RETRIES failed, retrying in 2 seconds..."
    sleep 2
done

if [ "$HEALTH_CHECK_PASSED" = true ]; then
    log "Health check passed ✓"
else
    error "Health check failed after $MAX_RETRIES attempts. Please check the logs: pm2 logs matchtalk-backend"
fi

# ============================================
# Display deployment summary
# ============================================
log "Deployment completed successfully! ✓"
echo ""
echo "============================================"
echo "Deployment Summary"
echo "============================================"
echo "Environment: $ENVIRONMENT"
echo "Status: $(pm2 jlist | jq -r '.[] | select(.name=="matchtalk-backend") | .pm2_env.status')"
echo "Instances: $(pm2 jlist | jq -r '[.[] | select(.name=="matchtalk-backend")] | length')"
echo "Uptime: $(pm2 jlist | jq -r '.[] | select(.name=="matchtalk-backend") | .pm2_env.pm_uptime')"
echo ""
echo "Useful commands:"
echo "  pm2 logs matchtalk-backend    - View logs"
echo "  pm2 monit                      - Monitor processes"
echo "  pm2 status                    - View status"
echo "  pm2 restart matchtalk-backend - Restart application"
echo "============================================"



