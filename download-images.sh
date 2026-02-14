#!/bin/bash

# 📥 Product Image Downloader for Luxe Companions
# Usage: ./download-images.sh <image-url-1> <image-url-2> ...

echo "🖼️ Luxe Companions - Product Image Downloader"
echo "============================================"
echo ""

# Create images folder if not exists
mkdir -p images

# Check if URLs provided
if [ $# -eq 0 ]; then
    echo "📝 Usage: ./download-images.sh <image-url-1> <image-url-2> ..."
    echo ""
    echo "Example:"
    echo "  ./download-images.sh https://example.com/aria.jpg https://example.com/bella.jpg"
    echo ""
    echo "Or edit this file with your URLs:"
    exit 1
fi

# Download images
counter=1
for url in "$@"; do
    echo "⬇️  Downloading image $counter: $url"
    
    # Extract filename from URL
    filename="images/product${counter}.jpg"
    
    # Download with curl
    if curl -sL "$url" -o "$filename"; then
        echo "✅ Saved to: $filename"
    else
        echo "❌ Failed to download: $url"
    fi
    
    counter=$((counter + 1))
done

echo ""
echo "🎉 Download complete!"
echo ""
echo "📝 Next steps:"
echo "1. Check the images/ folder"
echo "2. Verify images look correct"
echo "3. Update products.json with correct filenames"
echo ""
