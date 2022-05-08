export function namesToArray(names: Array<string> | string): Array<string> {
    if (Array.isArray(names)) {
        return names;
    }
    return names.split(',').map((name: string): string => {
        return name.trim().replace(/\s+/gi, ' ');
    });
}

export function arrayToNamesString(nameList: Array<string> | string): string {
    if (Array.isArray(nameList)) {
        return nameList.join(', ');
    }

    return nameList;
}
