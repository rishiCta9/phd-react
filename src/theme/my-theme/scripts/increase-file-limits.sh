#!/bin/bash

# Script to increase file descriptor limits for macOS/Linux
# This helps resolve "too many open files" errors during builds

echo "Current file descriptor limits:"
ulimit -n

echo ""
echo "Attempting to increase file descriptor limit..."

# For macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "Detected macOS"
    # Check current limit
    CURRENT_LIMIT=$(ulimit -n)
    echo "Current limit: $CURRENT_LIMIT"
    
    # Try to set a higher limit (macOS default is often 256, we'll try 10240)
    ulimit -n 10240
    
    if [ $? -eq 0 ]; then
        echo "✓ Successfully increased limit to: $(ulimit -n)"
    else
        echo "⚠ Could not increase limit. You may need to run:"
        echo "  sudo launchctl limit maxfiles 10240 10240"
        echo "  Then restart your terminal or run: ulimit -n 10240"
    fi
# For Linux
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "Detected Linux"
    CURRENT_LIMIT=$(ulimit -n)
    echo "Current limit: $CURRENT_LIMIT"
    
    # Try to set a higher limit
    ulimit -n 10240
    
    if [ $? -eq 0 ]; then
        echo "✓ Successfully increased limit to: $(ulimit -n)"
    else
        echo "⚠ Could not increase limit. You may need to:"
        echo "  1. Edit /etc/security/limits.conf and add:"
        echo "     * soft nofile 10240"
        echo "     * hard nofile 10240"
        echo "  2. Or run: ulimit -n 10240 (temporary)"
    fi
else
    echo "Unknown OS type: $OSTYPE"
    echo "Please manually increase file descriptor limits for your system"
fi

echo ""
echo "New file descriptor limit:"
ulimit -n

echo ""
echo "You can now run your build commands in this terminal session."
echo "Note: This change is temporary and only applies to this terminal session."

