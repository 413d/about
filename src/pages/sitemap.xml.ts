function normalizeBasePath(basePath: string): string {
	if (!basePath || basePath === '/') return '';
	return basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
}

function routeWithBase(routePath: string, basePath: string): string {
	if (routePath === '/') {
		return `${basePath || ''}/`;
	}
	return `${basePath}${routePath}`;
}

function absoluteUrl(routePath: string, site: URL, basePath: string): string {
	return new URL(routeWithBase(routePath, basePath), site).toString();
}

export function GET({ site }: { site: URL | undefined }): Response {
	if (!site) {
		const emptyXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml"></urlset>`;

		return new Response(emptyXml, {
			headers: {
				'Content-Type': 'application/xml; charset=utf-8'
			}
		});
	}

	const siteUrl = site;
	const basePath = normalizeBasePath(import.meta.env.BASE_URL);

	const pages = [
		{
			loc: '/',
			alternates: { en: '/', ru: '/ru' }
		},
		{
			loc: '/ru',
			alternates: { en: '/', ru: '/ru' }
		},
		{
			loc: '/text',
			alternates: { en: '/text', ru: '/text/ru' }
		},
		{
			loc: '/text/ru',
			alternates: { en: '/text', ru: '/text/ru' }
		}
	];

	const urls = pages
		.map((page) => {
			const loc = absoluteUrl(page.loc, siteUrl, basePath);
			const hrefEn = absoluteUrl(page.alternates.en, siteUrl, basePath);
			const hrefRu = absoluteUrl(page.alternates.ru, siteUrl, basePath);

			return `<url>
  <loc>${loc}</loc>
  <xhtml:link rel="alternate" hreflang="en" href="${hrefEn}" />
  <xhtml:link rel="alternate" hreflang="ru" href="${hrefRu}" />
  <xhtml:link rel="alternate" hreflang="x-default" href="${hrefEn}" />
</url>`;
		})
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	});
}
