export async function postWishLocation({ latitude, longitude }) {
    const base = import.meta.env.VITE_API_BASE_URL;
    const url = `${base}/wish-locations`;

    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude, longitude }),
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`POST /wish-locations ${res.status}: ${text}`);
    }

    const data = await res.json();

    const locationId = data.wishLocationId ?? null;
    const wishAddress = data.wishAddress ?? null;

    return { locationId, wishAddress, raw: data };
}