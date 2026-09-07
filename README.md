# topi-log

「140文字に納まらないツイートをするブログ」のソースコードだよ〜！💅

サイト: <https://topi-log.com>

ページづくりはAstro 5、見た目はTailwind CSS 4におまかせ！Markdownで書いた記事に、Zenn・はてなブログ・noteの記事も集めて、日付順に並べてるよ。ピン留め、目次、リンクカード、Mermaidの図、RSS配信まで対応してるの、なかなか盛りだくさんじゃん？✨

## まずはローカルで動かそ〜！

Node.jsとBunを用意したら、リポジトリのルートでこのコマンドを実行してね。依存関係は`bun.lock`で管理してるよ！

```sh
bun install --frozen-lockfile
bun run dev
```

起動したら、ターミナルに出てきたURLを開けばOK〜！通常は`http://localhost:4321`だよ。

外部記事やリンクカードの情報を取るにはネット接続が必要だよ。外部記事の取得に失敗すると、そのサービスの記事は一覧に出ないから、そこは覚えといてね！

## 開発コマンドはこれ！

| コマンド | 用途 |
| --- | --- |
| `bun run dev` | 開発サーバーを起動する |
| `bun run build` | 公開用のファイルを`dist/`に生成する |
| `bun run preview` | ビルド結果をローカルで確認する（先にビルドが必要） |
| `bun run lint` | oxlintで`src/`を検査する |
| `bun run astro --help` | Astro CLIのヘルプを表示する |

## 記事、書いてこ〜！

`src/content/blog/`にMarkdownファイルを作ってね。公開日時はファイル名から決まるから、`YYYYMMDD.md`か`YYYYMMDDHH.md`にしよ！`20260831-isucon2026.md`みたいに、日付の後ろに名前を付けるのもアリだよ〜。

例: `src/content/blog/20260908.md`

```markdown
---
title: 記事のタイトル
tags:
  - 日記
draft: true
---

ここに本文を書いてこ〜！
```

先頭の`---`で囲んだところが記事の設定だよ。`title`は必須！ほかは必要なものだけ書けばOK〜。

| 項目 | 用途 |
| --- | --- |
| `title` | 記事のタイトル |
| `tags` | タグの配列 |
| `draft` | `true`で下書きにする。公開時は`false`にするか項目を削除する |
| `pinned` | `true`でトップページに固定表示する |
| `pinnedOrder` | 固定表示の順番。正の整数で指定し、小さい値から表示する |
| `updatedDate` | 更新日。例: `2026-09-08` |
| `koukanblogList` | `true`で交換ブログの記事リストを本文末尾に表示する |
| `isuconEntries` | ISUCONの記録一覧。各項目に`title`、`member`（`とぴ`・`sora`・`wabi`）、`link`を指定する |

記事のURLは`/articles/ファイル名（拡張子なし）`になるよ。画像を`public/images/`に置いたら、本文に`![画像の説明](/images/example.png)`って書けば表示できる！

Markdownの見た目をチェックしたいときは、[src/content/dev/MarkdownStyleGuide.md](src/content/dev/MarkdownStyleGuide.md)を見てね〜！

### 下書きもチェックしよ！

`bun run dev`なら、下書きも通常の記事一覧と記事ページに出るよ。公開用ビルドでは、通常の記事一覧・記事ページ・RSSから外れる仕組み！

ここは押さえとこ！下書き専用のプレビューページは、公開用ビルドにも生成されるよ。パスは[src/consts.ts](src/consts.ts)の`PREVIEW_PATH`を見てね。検索エンジン向けに`noindex`を設定して、サイトマップからも外してるけど、認証はないからURLを知ってる人は読めるよ。

## ファイルの場所、ここ見て！

| パス | 内容 |
| --- | --- |
| `src/content/blog/` | ブログ記事 |
| `src/content/dev/` | 開発時だけ表示する確認用記事 |
| `src/content.config.ts` | 記事の設定項目と入力ルール |
| `src/pages/` | トップページ、記事一覧、プロフィール、RSSなどのページ |
| `src/components/`・`src/layouts/` | 共通の表示部品とページレイアウト |
| `src/styles/global.css` | 共通スタイル |
| `src/lib/blog.ts` | 記事の取得、公開日時の算出、並び順 |
| `src/lib/externalPosts.ts` | 外部ブログの記事取得と取得先URL |
| `src/lib/remark*.mjs` | Markdownのリンクカード・図の変換処理 |
| `src/data/koukanblog.json` | 交換ブログの記事URL一覧 |
| `src/consts.ts` | サイト名、説明文、下書きプレビューのパス |
| `public/` | 画像、フォントなど、そのまま配信するファイル |
| `.pages.yml` | Pages CMSの記事編集フォームと画像保存先の設定 |
| `astro.config.mjs` | サイトURL、Markdown処理、Cloudflareアダプターなどの設定 |
| `wrangler.jsonc` | Cloudflare向けの実行設定とビルド成果物の参照先 |

## 公開用にビルドしよ〜！

```sh
bun run build
```

Cloudflare向けのアダプターを設定してるよ。`wrangler.jsonc`では、`dist/_worker.js/index.js`をエントリーポイント、`dist/`を静的ファイルの置き場所にしてる！`package.json`にはデプロイ用のスクリプトは入ってないよ。

外部記事を取得するのはページを生成するとき！公開サイトの一覧に新しい記事を反映したいなら、もう一度ビルドしてね〜。
