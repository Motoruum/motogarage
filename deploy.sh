#!/bin/bash

# Motorcycle Stock Management - Production Deployment Script
# Usage: ./deploy.sh

set -e  # Exit on any error

echo "🚀 Starting production deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root"
   exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from template..."
    if [ -f env.example ]; then
        cp env.example .env
        print_warning "Please edit .env file with your production settings before continuing."
        print_warning "Then run this script again."
        exit 1
    else
        print_error "env.example file not found. Please create .env file manually."
        exit 1
    fi
fi

# Load environment variables
source .env

print_status "Environment loaded successfully"

# Stop existing containers
print_status "Stopping existing containers..."
docker-compose down

# Pull latest images
print_status "Pulling latest images..."
docker-compose pull

# Build and start containers
print_status "Building and starting containers..."
docker-compose up -d --build

# Wait for services to be ready
print_status "Waiting for services to be ready..."
sleep 30

# Check if services are running
print_status "Checking service status..."
if docker-compose ps | grep -q "Up"; then
    print_status "✅ All services are running successfully!"
else
    print_error "❌ Some services failed to start. Check logs with: docker-compose logs"
    exit 1
fi

# Check database connection
print_status "Checking database connection..."
if docker-compose exec -T db pg_isready -U postgres; then
    print_status "✅ Database is ready!"
else
    print_error "❌ Database is not ready. Check database logs."
    exit 1
fi

# Run database migrations (if needed)
print_status "Running database migrations..."
docker-compose exec -T backend java -jar app.jar --spring.profiles.active=production

# Check application health
print_status "Checking application health..."
sleep 10

if curl -f http://localhost:8080/actuator/health > /dev/null 2>&1; then
    print_status "✅ Backend is healthy!"
else
    print_warning "⚠️  Backend health check failed. This might be normal if health endpoint is not configured."
fi

if curl -f http://localhost:3000 > /dev/null 2>&1; then
    print_status "✅ Frontend is accessible!"
else
    print_warning "⚠️  Frontend is not accessible on port 3000. Check if it's running on a different port."
fi

# Show running containers
print_status "Current running containers:"
docker-compose ps

# Show logs summary
print_status "Recent logs (last 10 lines):"
docker-compose logs --tail=10

print_status "🎉 Deployment completed successfully!"
print_status "Your application should be accessible at:"
print_status "  - Frontend: http://localhost:3000"
print_status "  - Backend API: http://localhost:8080"
print_status ""
print_status "Useful commands:"
print_status "  - View logs: docker-compose logs -f"
print_status "  - Stop services: docker-compose down"
print_status "  - Restart services: docker-compose restart"
print_status "  - Update application: git pull && ./deploy.sh"
