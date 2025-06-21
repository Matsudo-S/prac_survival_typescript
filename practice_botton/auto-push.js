#!/usr/bin/env node

const { exec } = require('child_process');
const chokidar = require('chokidar');
const path = require('path');

// 監視対象のファイルとディレクトリ（survival_typescriptディレクトリから）
const watchPaths = [
  'practice_botton/like-button/src/**/*',
  'practice_botton/like-button/public/**/*',
  'practice_botton/like-button/*.html',
  'practice_botton/like-button/*.json',
  'practice_botton/like-button/*.js',
  'practice_botton/like-button/*.ts',
  'practice_botton/like-button/*.css',
  'practice_botton/like-button/*.md',
  'practice_botton/*.json',
  'practice_botton/*.js',
  'practice_botton/*.md',
  '*.json',
  '*.js',
  '*.md'
];

// 除外するファイルとディレクトリ
const ignorePaths = [
  '**/node_modules/**',
  '**/.git/**',
  '**/dist/**',
  '**/build/**',
  '**/*.log',
  '**/package-lock.json'
];

console.log('🚀 自動git push監視を開始しました...');
console.log('📁 監視対象:', watchPaths.join(', '));
console.log('❌ 除外対象:', ignorePaths.join(', '));

// ファイル変更を監視
const watcher = chokidar.watch(watchPaths, {
  ignored: ignorePaths,
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 1000,
    pollInterval: 100
  }
});

let isProcessing = false;
let pendingChanges = new Set();

// ファイル変更時の処理
watcher.on('change', (filePath) => {
  console.log(`📝 ファイル変更を検出: ${filePath}`);
  pendingChanges.add(filePath);
  
  if (!isProcessing) {
    processChanges();
  }
});

// ファイル追加時の処理
watcher.on('add', (filePath) => {
  console.log(`➕ ファイル追加を検出: ${filePath}`);
  pendingChanges.add(filePath);
  
  if (!isProcessing) {
    processChanges();
  }
});

// ファイル削除時の処理
watcher.on('unlink', (filePath) => {
  console.log(`🗑️ ファイル削除を検出: ${filePath}`);
  pendingChanges.add(filePath);
  
  if (!isProcessing) {
    processChanges();
  }
});

// 変更を処理する関数
async function processChanges() {
  if (isProcessing || pendingChanges.size === 0) return;
  
  isProcessing = true;
  console.log(`\n🔄 変更を処理中... (${pendingChanges.size}個のファイル)`);
  
  try {
    // git statusを確認
    await executeCommand('git status --porcelain');
    
    // 変更されたファイルがあるかチェック
    const status = await executeCommand('git status --porcelain');
    if (!status.trim()) {
      console.log('✅ コミットする変更がありません');
      pendingChanges.clear();
      isProcessing = false;
      return;
    }
    
    // すべての変更をステージング
    console.log('📦 変更をステージング中...');
    await executeCommand('git add .');
    
    // コミットメッセージを生成
    const timestamp = new Date().toLocaleString('ja-JP');
    const changedFiles = Array.from(pendingChanges).join(', ');
    const commitMessage = `Auto commit: ${changedFiles} - ${timestamp}`;
    
    // コミット
    console.log('💾 コミット中...');
    await executeCommand(`git commit -m "${commitMessage}"`);
    
    // プッシュ
    console.log('🚀 プッシュ中...');
    await executeCommand('git push');
    
    console.log('✅ 自動git pushが完了しました！');
    pendingChanges.clear();
    
  } catch (error) {
    console.error('❌ エラーが発生しました:', error.message);
  } finally {
    isProcessing = false;
  }
}

// コマンドを実行する関数
function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, { cwd: process.cwd() }, (error, stdout, stderr) => {
      if (error) {
        console.error(`コマンド実行エラー: ${command}`);
        console.error(`エラー: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.warn(`警告: ${stderr}`);
      }
      resolve(stdout);
    });
  });
}

// プロセス終了時の処理
process.on('SIGINT', () => {
  console.log('\n👋 監視を停止しています...');
  watcher.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n👋 監視を停止しています...');
  watcher.close();
  process.exit(0);
});

console.log('⏳ ファイル変更を待機中... (Ctrl+C で停止)'); 