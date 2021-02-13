const headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9,de-DE;q=0.8,de;q=0.7",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-apigee-classic-csrf": process.env.xApigeeClassicCsrf,
    "x-requested-with": "XMLHttpRequest",
    "cookie": process.env.cookie,
    "authority": "edgeui.apimanager.mercedes-benz.com",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4132.0 Safari/537.36",
    "referer": "https://edgeui.apimanager.mercedes-benz.com/platform/internal/analytics/v2/2b590c3d-9588-4639-89bd-32b67482279b",
    "accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7"
};