const Match = require('./match');
const {
    isValidTeamName,
    isValidScore
} = require('../utils/validations');


class Scoreboard {
    constructor() {
        this.matches = [];
    }

    startMatch(homeTeam, awayTeam) {
        if (
            !isValidTeamName(homeTeam) ||
            !isValidTeamName(awayTeam)
        ) {
            throw new Error('Team names should be strings');
        }

        const match = new Match(homeTeam, awayTeam);
        this.matches.push(match);

        return match.uuid;
    }

    updateScore(matchId, homeScore, awayScore) {
        if (
            !isValidScore(homeScore) ||
            !isValidScore(awayScore)
        ) {
            throw new Error('Scores must be absolute values');
        }

        const match = this.matches.find(
            match => match.uuid === matchId
        );

        if (!match) {
            throw new Error('Match not found');
        }

        if (match) {
            match.updateScore(homeScore, awayScore);
        }
    }

    finishMatch(matchId) {
        this.matches = this.matches.filter(
            match => !(match.uuid === matchId)
        );
    }

    getSummary() {
        return this.matches
            .slice()
            .sort((a, b) => {
                const scoreDifference = b.getTotalScore() - a.getTotalScore();

                if (scoreDifference === 0) {
                    return b.timestamp - a.timestamp;
                }

                return scoreDifference;
            })
            .map(match => ({
                homeTeam: match.homeTeam,
                awayTeam: match.awayTeam,
                homeScore: match.homeScore,
                awayScore: match.awayScore
            }));
    }
}


module.exports = Scoreboard;