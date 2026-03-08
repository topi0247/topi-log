---
title: 'Markdownスタイルガイド'
tags: ["Markdown", "技術"]
---

AstroでMarkdownコンテンツを書く際に使用できる基本的なMarkdown構文のサンプルです。

## 見出し

以下のHTML要素 `<h1>`〜`<h6>` は6段階の見出しレベルを表します。`<h1>` が最上位、`<h6>` が最下位です。

# H1

## H2

### H3

#### H4

##### H5

###### H6

## リンクカード

URLを単独で1行に書くとリンクカードになります。

https://zenn.dev/topi_log

## 段落

Markdownでは、空行で区切ることで段落を作成できます。改行を挿入したい場合は、行末にスペースを2つ入れるか、バックスラッシュ `\` を使います。

日本語のテキストも問題なく表示されます。句読点や全角文字、漢字・ひらがな・カタカナが混在していても、適切にレンダリングされます。

## 画像

### 構文

```markdown
![代替テキスト](./画像への/パス)
```

### 出力

![サンプル画像](/icon01.png)

### サイズ指定（HTMLタグ）

幅・高さを指定する場合はHTMLの `<img>` タグを使います。

```html
<!-- 幅を指定（高さは自動） -->
<img src="/icon01.png" alt="サンプル画像" width="200">

<!-- 幅・高さを両方指定 -->
<img src="/icon01.png" alt="サンプル画像" width="200" height="100">

<!-- CSSで指定 -->
<img src="/icon01.png" alt="サンプル画像" style="width: 200px;">
```

#### 出力

<img src="/icon01.png" alt="サンプル画像（幅200px）" width="200">

## 引用

引用要素は、他のソースから引用したコンテンツを表します。

### 帰属なしの引用

#### 構文

```markdown
> これは引用のサンプルです。
> **注意:** 引用内でも _Markdown構文_ が使えます。
```

#### 出力

> これは引用のサンプルです。
> **注意:** 引用内でも _Markdown構文_ が使えます。

### 帰属ありの引用

#### 構文

```markdown
> メモリを共有することで通信するのではなく、通信することでメモリを共有せよ。<br>
> — <cite>Rob Pike[^1]</cite>
```

#### 出力

> メモリを共有することで通信するのではなく、通信することでメモリを共有せよ。<br>
> — <cite>Rob Pike[^1]</cite>

[^1]: 上記の引用は、2015年11月18日のGopherfestにおけるRob Pikeの[講演](https://www.youtube.com/watch?v=PAAkCSZUG1c)から抜粋したものです。

## テーブル

### 構文

```markdown
| 斜体      | 太字     | コード |
| --------- | -------- | ------ |
| _italics_ | **bold** | `code` |
```

### 出力

| 斜体      | 太字     | コード |
| --------- | -------- | ------ |
| _italics_ | **bold** | `code` |

## コードブロック

### 構文

バッククォート3つで囲むことでコードブロックを作成できます。最初の3つのバッククォートの後に言語名（html、javascript、css、markdown、typescript、bash など）を書くと、シンタックスハイライトが適用されます。

````markdown
```html
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <title>HTMLドキュメントの例</title>
  </head>
  <body>
    <p>テスト</p>
  </body>
</html>
```
````

### 出力

```html
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <title>HTMLドキュメントの例</title>
  </head>
  <body>
    <p>テスト</p>
  </body>
</html>
```

```js:filename.js
const foo = 'bar';
```

## リストの種類

### 番号付きリスト

#### 構文

```markdown
1. 最初の項目
2. 2番目の項目
3. 3番目の項目
```

#### 出力

1. 最初の項目
2. 2番目の項目
3. 3番目の項目

### 番号なしリスト

#### 構文

```markdown
- リスト項目
- 別の項目
- さらに別の項目
```

#### 出力

- リスト項目
- 別の項目
- さらに別の項目

### ネストしたリスト

#### 構文

```markdown
- 果物
  - りんご
  - オレンジ
  - バナナ
- 乳製品
  - 牛乳
  - チーズ
```

#### 出力

- 果物
  - りんご
  - オレンジ
  - バナナ
- 乳製品
  - 牛乳
  - チーズ

## その他の要素 — abbr、sub、sup、kbd、mark

### 構文

```markdown
<abbr title="Graphics Interchange Format">GIF</abbr> はビットマップ画像フォーマットです。

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

セッションを終了するには <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>Delete</kbd> を押します。

多くの<mark>サンシャウオ</mark>は夜行性で、昆虫・ミミズ・その他の小動物を捕食します。
```

### 出力

<abbr title="Graphics Interchange Format">GIF</abbr> はビットマップ画像フォーマットです。

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

セッションを終了するには <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>Delete</kbd> を押します。

多くの<mark>サンシャウオ</mark>は夜行性で、昆虫・ミミズ・その他の小動物を捕食します。
