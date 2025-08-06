/* eslint-disable @typescript-eslint/no-explicit-any */
// app/sitemap.xml/route.ts

import { BASE_URL } from '@/shared/constants/urls';
import { NextResponse } from 'next/server';

const EXTERNAL_DATA_URL = `${BASE_URL}/companies`;



const generateSiteMap = (posts: any[]): string => {
    return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://www.listagreen.com.br</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>https://www.listagreen.com.br/mundosustentavel</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>https://www.listagreen.com.br/sobrenos</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>1.0</priority>
    </url>

    ${posts.map((post) => {
        const formattedCompanyId = post.slug
        return `
    <url>
      <loc>https://www.listagreen.com.br/home/negocios/${formattedCompanyId}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>0.80</priority>
    </url>`;
    }).join('')}
  </urlset>`;
};

export async function GET() {
    const response = await fetch(EXTERNAL_DATA_URL);
    const posts = await response.json();

    const sitemap = generateSiteMap(posts);

    return new NextResponse(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
