import store from '../store';


export function isValidTeamName(value) {
    return /[A-Za-z]+/.test(value);
}

export function isValidScore(value) {
    return Number.isInteger(value) && value >= 0;
}

export function isAlreadyPlaying(homeTeam, awayTeam) {
    const dupTeams = store.getState()
        .matches
        .filter(match => 
            [homeTeam, awayTeam].includes(match.homeTeam) || 
            [homeTeam, awayTeam].includes(match.awayTeam)
        )
        .map(match => {
            if (
                [match.homeTeam, match.awayTeam].includes(homeTeam) &&
                [match.homeTeam, match.awayTeam].includes(awayTeam)
            ) {
                return `${homeTeam}, ${awayTeam}`;
            }
            
            return [match.homeTeam, match.awayTeam].includes(homeTeam) ? homeTeam : awayTeam;
        });

    return dupTeams;
}
