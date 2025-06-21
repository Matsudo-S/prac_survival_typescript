#!/bin/bash

# 自動git pushスクリプト（survival_typescriptディレクトリ版）
# 使用方法: ./auto-push-simple.sh

echo "🚀 自動git push監視を開始しました..."
echo "📁 監視対象: practice_botton/like-button/src/, practice_botton/like-button/public/, *.html, *.json, *.js, *.ts, *.css, *.md"
echo "⏳ ファイル変更を待機中... (Ctrl+C で停止)"

# ファイル変更を監視して自動的にgit push
chokidar "practice_botton/like-button/src/**/*" "practice_botton/like-button/public/**/*" "practice_botton/like-button/*.html" "practice_botton/like-button/*.json" "practice_botton/like-button/*.js" "practice_botton/like-button/*.ts" "practice_botton/like-button/*.css" "practice_botton/like-button/*.md" "practice_botton/*.json" "practice_botton/*.js" "practice_botton/*.md" "*.json" "*.js" "*.md" \
  --ignore "**/node_modules/**" "**/.git/**" "**/dist/**" "**/build/**" "**/*.log" "**/package-lock.json" \
  --initial \
  --debounce 1000 \
  -c "echo '📝 変更を検出しました'; git add . && git commit -m 'Auto commit: $(date)' && git push && echo '✅ プッシュ完了'" 