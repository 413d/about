function normalizeBasePath(basePath: string): string {
	if (!basePath || basePath === '/') return '';
	return basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
}

export function GET({ site }: { site: URL | undefined }): Response {
	if (!site) {
		return new Response('User-agent: *\nDisallow: /\n', {
			headers: {
				'Content-Type': 'text/plain; charset=utf-8'
			}
		});
	}

	const siteUrl = site;
	const basePath = normalizeBasePath(import.meta.env.BASE_URL);
	const sitemapUrl = new URL(`${basePath}/sitemap.xml`, siteUrl).toString();

	const body = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
}
