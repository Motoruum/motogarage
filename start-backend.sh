#!/bin/bash

# Production Backend Startup Script
echo "Starting MotoGarage Backend..."

# Set production profile
export SPRING_PROFILES_ACTIVE=production

# Start the application
java -jar backend.jar --spring.config.location=file:./application-prod.properties

echo "Backend started successfully!"
