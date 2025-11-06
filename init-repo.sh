#!/bin/bash

# Election Cart Frontend - Repository Initialization Script
# This script helps set up the repository after cloning

echo "🚀 Election Cart Frontend - Repository Setup"
echo "=============================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "✅ .env.local created"
    echo "⚠️  Please update .env.local with your actual values"
else
    echo "✅ .env.local already exists"
fi

echo ""

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "=============================================="
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your API URL and Razorpay key"
echo "2. Make sure the backend is running"
echo "3. Run: npm run dev"
echo ""
echo "For more information, see SETUP.md"
