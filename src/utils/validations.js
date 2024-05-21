function isValidTeamName(value) {
    return /[A-Za-z]+/.test(value);
}

function isValidScore(value) {
    return Number.isInteger(value) && value >= 0;
}


module.exports = {
    isValidTeamName,
    isValidScore
};