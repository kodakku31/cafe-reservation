# カフェ予約システム

モダンでユーザーフレンドリーなカフェ予約システムです。

## 技術スタック

- **フロントエンド**
  - Next.js
  - Chakra UI
  - React Icons
  - Axios

- **バックエンド**
  - FastAPI
  - Firebase Firestore

## セットアップ方法

### 前提条件
- Python 3.8以上
- Node.js 14以上
- Firebase プロジェクト

### バックエンドのセットアップ

1. 仮想環境の作成と有効化
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\activate
```

2. 依存関係のインストール
```bash
pip install -r requirements.txt
```

3. 環境変数の設定
- `.env.example`を`.env`にコピーし、Firebase認証情報を設定

4. サーバーの起動
```bash
uvicorn main:app --reload
```

### フロントエンドのセットアップ

1. 依存関係のインストール
```bash
cd frontend
npm install
```

2. 開発サーバーの起動
```bash
npm run dev
```

## 機能

- 予約の作成
  - 名前、日付、時間、人数、電話番号、備考の入力
  - バリデーション機能
  - 成功/エラー通知

- 予約の表示
  - 予約一覧の表示
  - 予約詳細の表示

## 環境変数

### バックエンド (.env)
```
FIREBASE_TYPE=
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
FIREBASE_AUTH_URI=
FIREBASE_TOKEN_URI=
FIREBASE_CLIENT_X509_CERT_URL=
```

## ライセンス

MIT
