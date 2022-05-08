export function namesToArray(names: string): Array<string> {
    return names.split(',').map((name: string): string => {
        return name.trim().replace(/s+/gi, ' ');
    });
}

export function arrayToNames(nameList: Array<string>): string {
    return nameList.join(', ');
}
