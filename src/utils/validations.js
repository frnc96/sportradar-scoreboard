export function isValidTeamName(value) {
    return /[A-Za-z]+/.test(value);
}

export function isValidScore(value) {
    return Number.isInteger(value) && value >= 0;
}
