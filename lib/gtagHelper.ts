

export const pageview = (GA_TRACKING_ID : string, url : string) => {
    (window as any).gtag("config", GA_TRACKING_ID, {
        page_path: url,
    });
};