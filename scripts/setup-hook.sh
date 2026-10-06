#!/bin/bash
# =============================================================
# Setup script — jalankan SEKALI saja di server hosting
# Perintah: bash scripts/setup-hook.sh
# =============================================================

HOOK_TARGET=".git/hooks/post-merge"
HOOK_SOURCE="scripts/post-merge"

# Pastikan dijalankan dari root project
if [ ! -d ".git" ]; then
    echo "❌ Error: Jalankan script ini dari root direktori project Laravel."
    exit 1
fi

echo ""
echo "┌────────────────────────────────────────────────┐"
echo "│  ⚙️   Setup Git Hook — Sanggar Paiketan Swara  │"
echo "└────────────────────────────────────────────────┘"
echo ""

# Salin hook ke .git/hooks/
cp "$HOOK_SOURCE" "$HOOK_TARGET"

# Beri permission eksekusi
chmod +x "$HOOK_TARGET"

echo "✅  Hook post-merge berhasil dipasang!"
echo ""
echo "   Sekarang setiap kali kamu menjalankan:"
echo "   $ git pull"
echo ""
echo "   Akan otomatis berjalan:"
echo "   → composer install"
echo "   → php artisan migrate"
echo "   → php artisan config:cache"
echo "   → php artisan route:cache"
echo "   → php artisan view:cache"
echo "   → php artisan storage:link"
echo ""
echo "🎉  Setup selesai! Cukup git pull dari sekarang."
echo ""
