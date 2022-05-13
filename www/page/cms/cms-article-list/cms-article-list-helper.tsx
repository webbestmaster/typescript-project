export function renderDate(dateIso: string): string {
    return dateIso.replace('T', ' ').replace(/\.\S+/, '');
}
