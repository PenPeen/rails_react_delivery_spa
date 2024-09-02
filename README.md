# PenEats

## 概要

Rails + React を使用したデリバリーアプリケーション

<img src="" alt="" width="600"/>

### 基本機能

- ログイン
- レストラン一覧
- 食品一覧
- カートへの商品登録 / 削除
- 食品のオーダー

## Used

### FrontEnd

- TypeScript
- React
- Redux ToolKit

### Backend

- Rails

## Components

<details>
<summary>Accordion</summary>

カート内の商品を表示するためのアコーディオン

<img src="" alt="" width="400"/>

</details>

<details>
<summary>Badge</summary>

カート内の商品数などを表示するための Badge コンポーネント

<img src="" alt="" width="600"/>

</details>

<details>
<summary>Button</summary>

汎用的なボタンコンポーネント

<img src="" alt="" width="200"/>

</details>

<details>
<summary>CountDownButton / CountUpButton</summary>

商品数を増減させるためのボタンコンポーネント

<img src="" alt="" width="400"/>

</details>

<details>
<summary>FoodModal</summary>

商品追加時に表示されるモーダルコンポーネント

<img src="" alt="" width=""/>

</details>

<details>
<summary>Foods</summary>

商品一覧画面

<img src="" alt="" width="200"/>

</details>

<details>
<summary>Header</summary>

ヘッダーコンポーネント

<img src="" alt="" width="200"/>

</details>

<details>
<summary>Modal</summary>

汎用的なモーダルコンポーネント

<img src="" alt="" width="200"/>

</details>

<details>
<summary>NewOrderConfirmModal</summary>

商品を置換するためのモーダルコンポーネント

<img src="" alt="" width="200"/>

</details>

<details>
<summary>NotFound</summary>

ルーティングに一致しないページアクセス時に表示されるコンポーネント

<img src="" alt="" width="200"/>

</details>

<details>
<summary>Orders</summary>

注文画面のページ

<img src="" alt="" width="200"/>

</details>

<details>
<summary>Restaurants</summary>

レストラン一覧画面

<img src="" alt="" width="200"/>

</details>

## Infrastructure

`Docker` を使用

## ディレクトリ構成...

ディレクトリ構成は [bulletproof-react](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md) に準拠する形とする

- 小規模アプリケーションのため、`AtomicDesign` は採用していない。
- コンポーネント毎にディレクトリを作成し、`index.tsx`, `xxx.module.css` を定義している
- スタイル反映には CSS Modules を採用
