#!/bin/bash

# 🎨 Doll Shop Deployment Script
# Deploy your website to free hosting!

echo "🧸 Dreamland Dolls - Deployment Script"
echo "======================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git first."
    exit 1
fi

# Check if directory is a git repo
if [ ! -d .git ]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit - Dreamland Dolls website"
    echo ""
    echo "✅ Git repository created!"
fi

echo ""
echo "🚀 Deployment Options:"
echo ""
echo "1️⃣  GitHub Pages (100% FREE)"
echo "   - Go to: https://github.com"
echo "   - Create a new repository 'doll-shop'"
echo "   - Run: git remote add origin https://github.com/YOUR_USERNAME/doll-shop.git"
echo "   - Run: git push -u origin main"
echo "   - Go to: https://github.com/YOUR_USERNAME/doll-shop/settings/pages"
echo "   - Select 'main' branch and save"
echo "   - Your site will be at: https://YOUR_USERNAME.github.io/doll-shop"
echo ""

echo "2️⃣  Netlify (100% FREE)"
echo "   - Go to: https://netlify.com"
echo "   - Sign up and connect GitHub"
echo "   - Click 'Add new site' → 'Import an existing project'"
echo "   - Select your GitHub repository"
echo "   - Done! Get free URL instantly"
echo ""

echo "3️⃣  Vercel (100% FREE)"  
echo "   - Go to: https://vercel.com"
echo "   - Sign up and connect GitHub"
echo "   - Click 'New Project'"
echo "   - Import your GitHub repository"
echo "   - Done! Get free URL instantly"
echo ""

echo "📝 Quick Setup Instructions:"
echo ""
echo "Step 1: Create free account on GitHub.com"
echo "Step 2: Create repository named 'doll-shop'"
echo "Step 3: Run these commands:"
echo ""
echo "   git remote add origin https://github.com/YOUR_USERNAME/doll-shop.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "Step 4: Enable GitHub Pages (Settings → Pages → Save)"
echo ""
echo "🎉 Your website will be live at:"
echo "   https://YOUR_USERNAME.github.io/doll-shop"
echo ""

echo "💡 TIP: Want me to help you set up GitHub? Just ask!"
