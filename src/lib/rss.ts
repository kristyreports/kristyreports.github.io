export interface RssFeedItem {
	title: string;
	excerpt: string;
	link: string;
	pubDate: string;
	img: string;
	creator?: string;
}

export const defaultRssCorsProxy = 'https://corsproxy.io/?url=';

function getTextValue(item: Element, tagNames: string[]): string {
	for (const tagName of tagNames) {
		const elements = item.getElementsByTagName(tagName);
		if (elements.length && elements[0]?.textContent) {
			return elements[0].textContent.trim();
		}
	}

	for (const child of Array.from(item.children)) {
		if (tagNames.includes(child.localName) || tagNames.includes(child.nodeName)) {
			return child.textContent?.trim() ?? '';
		}
	}

	return '';
}

function cleanExcerpt(html: string): string {
	const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
	if (!text) return '';
	return text.length > 150 ? `${text.slice(0, 150).trim()}...` : text;
}

function sanitizeXml(text: string): string {
	return text.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g, '');
}

export function parseRssFeed(xmlDoc: Document, creatorFilter?: string): RssFeedItem[] {
	if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
		throw new Error('Failed to parse RSS feed');
	}

	return Array.from(xmlDoc.querySelectorAll('item'))
		.map((item) => {
			const title = getTextValue(item, ['title']) || 'Untitled';
			const description = getTextValue(item, ['description', 'content:encoded']);
			const link = getTextValue(item, ['link']);
			const pubDate = getTextValue(item, ['pubDate', 'date']);
			const creator = getTextValue(item, ['creator', 'dc:creator', 'author']);
			const enclosure = item.querySelector('enclosure');
			const img = enclosure?.getAttribute('url') ?? '';
			const excerpt = cleanExcerpt(description);

			return { title, excerpt, link, pubDate, img, creator };
		})
		.filter((post) => {
			if (!post.title || !post.link) return false;
			if (!creatorFilter) return true;
			return post.creator === creatorFilter;
		});
}

export async function fetchRssFeed(feedUrl: string, corsProxy: string = defaultRssCorsProxy, creatorFilter?: string): Promise<RssFeedItem[]> {
	const response = await fetch(corsProxy + encodeURIComponent(feedUrl));
	if (!response.ok) {
		throw new Error(`HTTP ${response.status}`);
	}

	const text = await response.text();
	const parser = new DOMParser();
	const sanitizedText = sanitizeXml(text);
	const xmlDoc = parser.parseFromString(sanitizedText, 'text/xml');

	return parseRssFeed(xmlDoc, creatorFilter);
}
