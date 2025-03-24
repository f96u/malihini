# malihini

# デザイン
テーマカラー
https://colorhunt.co/palette/3f7d58efefefef9651ec5228

- メイン #3F7D58 rgb(63, 125, 88) green
- サブ #EFEFEF rgb(239, 239, 239) gray
- サブ2 #EF9651 rgb(239, 150, 81) orange
- アクセント #EC5228 rgb(236, 82, 40) orange

# 開発

## 環境変数
firebase hostingにて環境変数を扱う方法

シークレットな値を利用するには、以下のコマンドでGCPのSecretManagerに登録する必要がある
`$ firebase apphosting:secrets:set SECRET_HOGE_KEY`
登録された値の確認
`$ firebase apphosting:secrets:access SECRET_HOGE_KEY`
その後、登録した値にhostingがアクセスできるように権限を渡す
`$ firebase apphosting:secrets:grantaccess --backend malihini-backend SECRET_HOGE_KEY`
ここで指定するバックエンドの値は
`$ firebase apphosting:backends:list`
で確認することができる。