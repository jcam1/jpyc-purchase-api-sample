# JPYC 外部用購入API サンプルコード

このレポジトリは、JPYC外部用購入APIのサンプルコードを提供します。このAPIを使用して、JPYCトークンを購入することができます。以下に詳細な情報と使用方法を記載します。

## 注意事項

- **URL**: このサンプルでは、JPYC Appsのstaging環境のURLが使用されています。本番環境への適用には異なるURLが必要です。
- **購入金額制限とKYC**: 現時点では購入金額制限やKYCの実施はありませんが、将来的に導入される可能性があります。
- **銀行口座振込情報**: 現状、APIのレスポンスに銀行口座の振込情報が含まれていますが、今後は含まれなくなる可能性があるため、その点に注意してください。
- **APIキー**: APIキーはヘッダーに含める必要があります。

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
