# 自動Git Push機能

このプロジェクトでは、ファイル変更を自動的に検出してgit pushする機能を提供しています。

## 機能

- 📝 ファイル変更の自動検出
- 💾 自動コミット
- 🚀 自動プッシュ
- ⏱️ デバウンス機能（連続変更の制御）
- 🚫 不要なファイルの除外

## 使用方法

### 方法1: Node.jsスクリプト（推奨）

```bash
npm run auto-push
```

または

```bash
npm run watch
```

### 方法2: シンプル版（chokidar-cli使用）

```bash
npm run auto-push-simple
```

または

```bash
./auto-push-simple.sh
```

### 方法3: 直接実行

```bash
node auto-push.js
```

## 監視対象ファイル

- `src/**/*` - ソースコード
- `public/**/*` - 公開ファイル
- `*.html` - HTMLファイル
- `*.json` - JSONファイル
- `*.js` - JavaScriptファイル
- `*.ts` - TypeScriptファイル
- `*.css` - CSSファイル
- `*.md` - Markdownファイル

## 除外ファイル

- `node_modules/**` - 依存関係
- `.git/**` - Git関連ファイル
- `dist/**` - ビルド出力
- `build/**` - ビルド出力
- `*.log` - ログファイル
- `package-lock.json` - ロックファイル

## 設定のカスタマイズ

### 監視対象の変更

`auto-push.js`の`watchPaths`配列を編集してください：

```javascript
const watchPaths = [
  'src/**/*',
  'public/**/*',
  '*.html',
  '*.json',
  '*.js',
  '*.ts',
  '*.css',
  '*.md',
  // 追加したいパターンをここに記述
];
```

### 除外対象の変更

`auto-push.js`の`ignorePaths`配列を編集してください：

```javascript
const ignorePaths = [
  'node_modules/**',
  '.git/**',
  'dist/**',
  'build/**',
  '*.log',
  'package-lock.json',
  // 除外したいパターンをここに記述
];
```

## 注意事項

1. **初回実行時**: リモートリポジトリが設定されていることを確認してください
2. **認証**: Gitの認証情報が正しく設定されていることを確認してください
3. **ブランチ**: 適切なブランチで実行していることを確認してください
4. **停止**: `Ctrl+C`で監視を停止できます

## トラブルシューティング

### エラー: "git push failed"

- リモートリポジトリが設定されているか確認
- Git認証情報が正しいか確認
- ネットワーク接続を確認

### エラー: "permission denied"

- スクリプトに実行権限があるか確認: `chmod +x auto-push-simple.sh`

### ファイルが監視されない

- ファイルパスが正しいか確認
- 除外設定に該当していないか確認

## 開発者向け

### 新しい監視スクリプトの追加

1. スクリプトファイルを作成
2. `package.json`の`scripts`セクションに追加
3. 必要に応じて依存関係を追加

### デバッグ

詳細なログを確認するには、スクリプト内の`console.log`を有効にしてください。 