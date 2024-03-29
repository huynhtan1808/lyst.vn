'use client';

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from "react";
import { pageview } from "@/lib/gtagHelper"

export default function GoogleAnalytics({ GA_TRACKING_ID }: { GA_TRACKING_ID?: string }) {

  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (GA_TRACKING_ID) {
      const params = searchParams ?? '';
      const url = pathname + params.toString();

      pageview(GA_TRACKING_ID, url);
    }
  }, [GA_TRACKING_ID, pathname, searchParams]);

  return (
    <>
      <Script strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
      {GA_TRACKING_ID && (
        <Script id='google-analytics' strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', '${GA_TRACKING_ID}', {
                page_path: '${pathname}' + '${searchParams?.toString()}',
            });
            `,
          }}
        />
      )}
    </>
  )
}
