interface StringMap { [key: string]: any; }

export class LocalStorage {
    cache: StringMap = {};

    getItem(key: string) {
        if (this.cache[key]) {
            return this.cache[key];
        }

        if (typeof window === 'undefined') return null;

        const value = window.localStorage.getItem(key);

        if (!value) {
            return null;
        }

        this.cache[key] = JSON.parse(value);

        return JSON.parse(value);
    }

    removeItem(key: string) {
        delete this.cache[key];

        if (typeof window !== 'undefined')
            window.localStorage.removeItem(key);
    }

    setItem(key: string, value: any) {
        delete this.cache[key];

        if (typeof window !== 'undefined')
            window.localStorage.setItem(key, JSON.stringify(value));
    }
}
