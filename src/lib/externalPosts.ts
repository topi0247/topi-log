export type ExternalPost = {
	type: 'zenn' | 'hatenablog' | 'note';
	title: string;
	pubDate: Date;
	excerpt: string;
	url: string;
};

function extractTag(xml: string, tag: string): string {
	const escaped = tag.replace(':', '\\:');
	const m = xml.match(new RegExp(`<${escaped}(?:\\s[^>]*)?>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${escaped}>`, 'i'));
	return m?.[1]?.trim() ?? '';
}

function parseRssItems(xml: string): { title: string; link: string; pubDate: string; description: string }[] {
	const items: { title: string; link: string; pubDate: string; description: string }[] = [];
	const re = /<item[^>]*>([\s\S]*?)<\/item>/g;
	let m: RegExpExecArray | null;
	while ((m = re.exec(xml)) !== null) {
		const body = m[1];
		// rdf:about属性もフォールバックとして取得（RSS 1.0対応）
		const rdfAbout = m[0].match(/rdf:about="([^"]+)"/)?.[1] ?? '';
		items.push({
			title: extractTag(body, 'title'),
			link: extractTag(body, 'link') || rdfAbout,
			pubDate: extractTag(body, 'pubDate') || extractTag(body, 'dc:date'),
			description: extractTag(body, 'description'),
		});
	}
	return items;
}

function stripHtml(html: string): string {
	return html
		.replace(/<[^>]+>/g, ' ')
		.replace(/&nbsp;/g, ' ')
		.replace(/&[a-z]+;/gi, '')
		.replace(/\s+/g, ' ')
		.trim();
}

async function fetchZenn(): Promise<ExternalPost[]> {
	try {
		const res = await fetch('https://zenn.dev/api/articles?username=topi_log&count=100&order=latest');
		if (!res.ok) return [];
		const data = await res.json() as {
			articles?: { title: string; published_at: string; slug: string }[];
		};
		return (data.articles ?? []).map((a) => ({
			type: 'zenn',
			title: a.title,
			pubDate: new Date(a.published_at),
			excerpt: '',
			url: `https://zenn.dev/topi_log/articles/${a.slug}`,
		}));
	} catch {
		return [];
	}
}

async function fetchHatenablog(): Promise<ExternalPost[]> {
	try {
		const res = await fetch('https://topi-log.hatenablog.jp/rss');
		if (!res.ok) return [];
		const xml = await res.text();
		return parseRssItems(xml)
			.filter((item) => item.title && item.link)
			.map((item) => ({
				type: 'hatenablog',
				title: item.title,
				pubDate: new Date(item.pubDate),
				excerpt: stripHtml(item.description).slice(0, 100),
				url: item.link,
			}));
	} catch {
		return [];
	}
}

async function fetchNote(): Promise<ExternalPost[]> {
	try {
		const res = await fetch('https://note.com/topi_log/rss');
		if (!res.ok) return [];
		const xml = await res.text();
		return parseRssItems(xml)
			.filter((item) => item.title && item.link)
			.map((item) => ({
				type: 'note',
				title: item.title,
				pubDate: new Date(item.pubDate),
				excerpt: stripHtml(item.description).slice(0, 100),
				url: item.link,
			}));
	} catch {
		return [];
	}
}

export async function getExternalPosts(): Promise<ExternalPost[]> {
	const [zenn, hatenablog, note] = await Promise.all([
		fetchZenn(),
		fetchHatenablog(),
		fetchNote(),
	]);
	return [...zenn, ...hatenablog, ...note];
}
