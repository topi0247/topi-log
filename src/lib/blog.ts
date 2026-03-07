import { getCollection } from 'astro:content';

/**
 * ファイル名（yyyymmddhh または yyyymmdd）から公開日時を生成する
 */
function parsePubDateFromId(id: string): Date {
	const match = id.match(/^(\d{4})(\d{2})(\d{2})(\d{2})?/);
	if (!match) throw new Error(`ブログファイル名が不正です: ${id}`);
	const [, yyyy, mm, dd, hh = '00'] = match;
	return new Date(`${yyyy}-${mm}-${dd}T${hh}:00:00`);
}

/**
 * 公開済みブログ記事を取得する（draft除外・日付降順）
 */
export async function getBlogPosts() {
	const posts = await getCollection('blog', ({ id }) => !id.startsWith('draft'));
	return posts
		.map((post) => ({
			...post,
			data: {
				...post.data,
				pubDate: parsePubDateFromId(post.id),
			},
		}))
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * ピン留め記事を取得する（1件のみ）
 */
export async function getPinnedPost() {
	const posts = await getBlogPosts();
	return posts.find((post) => post.data.pinned === true) ?? null;
}
