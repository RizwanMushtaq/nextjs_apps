type NonUndefined<T> = {
    [K in keyof T]: Exclude<T[K], undefined>;
};

export function removeUndefined<T extends Record<string, unknown>>(
    obj: T
): NonUndefined<T> {
    const result = {} as Partial<NonUndefined<T>>;

    for (const [key, value] of Object.entries(obj)) {
        if (value !== undefined) {
            result[key as keyof T] = value as NonUndefined<T>[keyof T];
        }
    }

    return result as NonUndefined<T>;
}
