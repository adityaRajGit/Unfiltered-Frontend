import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/pages/login/', '/pages/account/'],
      },
      {
        userAgent: 'GPTBot', // OpenAI's crawler for ChatGPT
        allow: '/',
        disallow: ['/admin/', '/api/', '/pages/login/', '/pages/account/'],
      },
      {
        userAgent: 'Google-Extended', // Google's AI crawler
        allow: '/',
        disallow: ['/admin/', '/api/', '/pages/login/', '/pages/account/'],
      },
      {
        userAgent: 'anthropic-ai', // Anthropic's Claude crawler
        allow: '/',
        disallow: ['/admin/', '/api/', '/pages/login/', '/pages/account/'],
      },
      {
        userAgent: 'ClaudeBot', // Claude's crawler
        allow: '/',
        disallow: ['/admin/', '/api/', '/pages/login/', '/pages/account/'],
      },
      {
        userAgent: 'ChatGPT-User', // ChatGPT user agent
        allow: '/',
        disallow: ['/admin/', '/api/', '/pages/login/', '/pages/account/'],
      },
    ],
    sitemap: 'https://stayunfiltered.com/sitemap.xml',
  }
}
