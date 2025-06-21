#!/bin/bash

# 自動git pushスクリプト
# 使用方法: ./auto-push-simple.sh

echo "🚀 自動git push監視を開始しました..."
echo "📁 監視対象: src/, public/, *.html, *.json, *.js, *.ts, *.css, *.md"
echo "⏳ ファイル変更を待機中... (Ctrl+C で停止)"

# ファイル変更を監視して自動的にgit push
chokidar "src/**/*" "public/**/*" "*.html" "*.json" "*.js" "*.ts" "*.css" "*.md" \
  --ignore "node_modules/**" ".git/**" "dist/**" "build/**" "*.log" "package-lock.json" \
  --initial \
  --debounce 1000 \
  -c "echo '📝 変更を検出しました'; git add . && git commit -m 'Auto commit: $(date)' && git push && echo '✅ プッシュ完了'" 