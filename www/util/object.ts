export function isObjectInclude(object: Record<string, unknown>, query: Record<string, unknown>): boolean {
    return Object.keys(query).every((queryKey: string): boolean => query[queryKey] === object[queryKey]);
}
