export class Http {
    static async get<t>(path: string, query: Record<string, string>): Promise<t> {
        const url = new URL(path, window.location.href);
        url.search = new URLSearchParams(query).toString();

        const res = await fetch(url.toString());
        const data = await res.json();
        return data;
    }

    static async post<t>(path: string, body?: Record<string, string | number>): Promise<t> {
        const res = await fetch(path.toString(), {
            body: JSON.stringify(body),
            method: 'POST'
        });
        const data = await res.json();
        return data;
    }
}