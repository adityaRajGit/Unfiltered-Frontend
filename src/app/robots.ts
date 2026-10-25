import { MetadataRoute } from 'next'
import { absoluteUrl } from '@/utils/site'

// One rule for every crawler, AI crawlers included (GPTBot, ClaudeBot,
// Google-Extended and the rest all follow the * group).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/pages/login/', '/pages/account/'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  }
}
