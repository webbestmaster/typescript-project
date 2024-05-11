export function getRandomNumber(fromNumber = 0, toNumber = 1e9): number {
    // -- eslint-disable-next-line no-mixed-operators
    return Math.floor(Math.random() * (toNumber - fromNumber) + fromNumber);
}
