# Survival TypeScript - Practice Projects

このプロジェクトは、TypeScriptの練習用プロジェクト群で、ファイル変更を自動的に検出してgit pushする機能を提供しています。

## プロジェクト構造

```
survival_typescript/
├── practice_botton/        # ボタンプロジェクト
│   ├── like-button/        # React + TypeScript プロジェクト
│   │   ├── src/           # ソースコード
│   │   ├── public/        # 公開ファイル
│   │   └── package.json   # プロジェクト依存関係
│   ├── auto-push.js       # プロジェクト固有の自動git pushスクリプト
│   ├── auto-push-simple.sh # プロジェクト固有のシンプル版スクリプト
│   └── README.md          # プロジェクト固有の説明
├── auto-push.js           # ルート自動git pushスクリプト（Node.js版）
├── auto-push-simple.sh    # ルート自動git pushスクリプト（シンプル版）
├── package.json           # ルート依存関係
└── README.md             # このファイル
```

## 自動Git Push機能

### 機能

- 📝 ファイル変更の自動検出
- 💾 自動コミット
- 🚀 自動プッシュ
- ⏱️ デバウンス機能（連続変更の制御）
- 🚫 不要なファイルの除外

### 使用方法

#### 方法1: Node.jsスクリプト（推奨）

```bash
npm run auto-push
```

または

```bash
npm run watch
```

#### 方法2: シンプル版（chokidar-cli使用）

```bash
npm run auto-push-simple
```

または

```bash
./auto-push-simple.sh
```

#### 方法3: 直接実行

```bash
node auto-push.js
```

### 監視対象ファイル

- `practice_botton/like-button/src/**/*` - ソースコード
- `practice_botton/like-button/public/**/*` - 公開ファイル
- `practice_botton/like-button/*.html` - HTMLファイル
- `practice_botton/like-button/*.json` - JSONファイル
- `practice_botton/like-button/*.js` - JavaScriptファイル
- `practice_botton/like-button/*.ts` - TypeScriptファイル
- `practice_botton/like-button/*.css` - CSSファイル
- `practice_botton/like-button/*.md` - Markdownファイル
- `practice_botton/*.json` - プロジェクト設定ファイル
- `practice_botton/*.js` - プロジェクトスクリプト
- `practice_botton/*.md` - プロジェクトドキュメント
- `*.json` - ルートJSONファイル
- `*.js` - ルートJavaScriptファイル
- `*.md` - ルートMarkdownファイル

### 除外ファイル

- `**/node_modules/**` - 依存関係
- `**/.git/**` - Git関連ファイル
- `**/dist/**` - ビルド出力
- `**/build/**` - ビルド出力
- `**/*.log` - ログファイル
- `**/package-lock.json` - ロックファイル

## 開発コマンド

### practice_bottonプロジェクトの開発

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# リント
npm run lint
```

### 自動git push

```bash
# 自動git push開始
npm run auto-push

# シンプル版
npm run auto-push-simple
```

## セットアップ

1. 依存関係のインストール
```bash
npm install
cd practice_botton/like-button && npm install
```

2. Gitリポジトリの初期化（初回のみ）
```bash
git init
git remote add origin <your-repository-url>
```

3. 自動git pushの開始
```bash
npm run auto-push
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

## カスタマイズ

### 監視対象の変更

`auto-push.js`の`watchPaths`配列を編集してください：

```javascript
const watchPaths = [
  'practice_botton/like-button/src/**/*',
  'practice_botton/like-button/public/**/*',
  // 追加したいパターンをここに記述
];
```

### 除外対象の変更

`auto-push.js`の`ignorePaths`配列を編集してください：

```javascript
const ignorePaths = [
  '**/node_modules/**',
  '**/.git/**',
  // 除外したいパターンをここに記述
];
``` 