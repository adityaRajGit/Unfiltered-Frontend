import JsonLd from '@/component/global/JsonLd';
import SessionsPageClient from '@/component/one-on-one/SessionsPageClient';
import { fetchPackageBySessions } from '@/lib/packageApi';
import { serviceJsonLd } from '@/utils/schema';
import { PAGE_SEO } from '@/utils/seo';

export default async function SessionsPage() {
    const pkg = await fetchPackageBySessions(1);
    return (
        <>
            <JsonLd
                data={serviceJsonLd({
                    name: 'Online therapy sessions',
                    description: PAGE_SEO['/pages/one-on-one'].description,
                    path: '/pages/one-on-one',
                    price: pkg?.discountedPrice,
                })}
            />
            <SessionsPageClient initialPackage={pkg} />
        </>
    );
}
