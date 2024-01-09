# JPYC購入API サンプルアプリ

このリポジトリは、JPYC購入APIを使用してJPYCを購入するためのサンプルアプリを提供します。以下に詳細な使用方法や注意事項等を記載します。

## 使用方法

### 1. リポジトリをクローン
```
git clone https://github.com/jcam1/jpyc-apps-public-api-sample.git
```

### 2. envファイルの作成
- .env.exampleファイルのファイル名を.envに変更
- NEXT_PUBLIC_THIRDWEB_CLIENT_IDの値に、[thirdweb](https://portal.thirdweb.com/api-keys/create)で作成したAPIキーのクライアントIDを入力する
- NEXT_PUBLIC_JPYC_PURCHASE_API_KEYの値に、JPYC購入APIのAPIキーを入力する

### 3. 依存関係のインストール
- Nodeバージョンは18.17.0以上
```
pnpm install
or
npm install
```

### 4. 実行
```
pnpm run dev
or
npm run dev
```

### 5. ブラウザで動作確認
[http://localhost:3000/](http://localhost:3000/)

## 注意事項

- **URL**: このサンプルでは、JPYC Appsのstaging環境のURLが使用されています。本番環境を使用する際には異なるURLが必要です。
- **JPYC購入APIキー**: JPYC購入APIキーは、リクエストヘッダーに含める必要があります。staging環境と本番環境では、APIキーが異なります。

## リクエストの例

以下は、staging環境でのAPIリクエストのサンプルです。

```http
POST https://app-jpyc-jp.staging.jcam.co.jp/api/public/buy-sell/bank
content-type: application/json
apiKey: {{ apiKey }}

{
  "amount": 50000,
  "sendnetwork": "1",
  "sendnetworkaddress": "0xabcde00893630358284427449880569752667877",
  "kanalastname": "テスト",
  "kanafirstname": "ナリカノク",
  "mailaddress": "57Nv1AIx5q4jH4lqPUsQHOQ11WXBJUkgq4KgKUIa@test.mail"
}
```

## サポートしているネットワーク

このAPIは、以下のネットワークをサポートしています。

- Mainnet
- Polygon
- Gnosis
- Shiden
- Avalanche
- Astar

## デザイン

このプロジェクトのデザインには、[shadcn](https://ui.shadcn.com/)のライブラリが使用されています。

## 実装の詳細

実際にエンドポイントを叩いているコードは、`src/components/JpycPurchaseForm.tsx`の64行目にあります。

```typescript
const res = await axios.post('https://app-jpyc-jp.staging.jcam.co.jp/api/public/buy-sell/bank', values, {
  headers: {
    'Content-Type': 'application/json',
    apiKey: apiKey,
  },
});
```
