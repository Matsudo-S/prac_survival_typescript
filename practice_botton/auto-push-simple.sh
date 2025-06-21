#!/bin/bash

# 自動git pushスクリプト（rootディレクトリ版）
# 使用方法: ./auto-push-simple.sh

echo "🚀 自動git push監視を開始しました..."
echo "📁 監視対象: like-button/src/, like-button/public/, *.html, *.json, *.js, *.ts, *.css, *.md"
echo "⏳ ファイル変更を待機中... (Ctrl+C で停止)"

# ファイル変更を監視して自動的にgit push
chokidar "like-button/src/**/*" "like-button/public/**/*" "like-button/*.html" "like-button/*.json" "like-button/*.js" "like-button/*.ts" "like-button/*.css" "like-button/*.md" "*.json" "*.js" "*.md" \
  --ignore "**/node_modules/**" "**/.git/**" "**/dist/**" "**/build/**" "**/*.log" "**/package-lock.json" \
  --initial \
  --debounce 1000 \
  -c "echo '📝 変更を検出しました'; git add . && git commit -m 'Auto commit: $(date)' && git push && echo '✅ プッシュ完了'" 