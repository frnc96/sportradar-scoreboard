import Match from './match';
import store from '../store';
import { isValidTeamName, isValidScore } from '../utils/validations';


class Scoreboard {
    startMatch(homeTeam, awayTeam) {
        if (
            !isValidTeamName(homeTeam) ||
            !isValidTeamName(awayTeam)
        ) {
            throw new Error('Team names should be strings');
        }

        // Todo - team names should not match
        // Todo - Either team can't participate in multiple matches

        const match = new Match(homeTeam, awayTeam);
        store.addMatch(match)

        return match.uuid;
    }

    updateScore(matchId, homeScore, awayScore) {
        if (
            !isValidScore(homeScore) ||
            !isValidScore(awayScore)
        ) {
            throw new Error('Scores must be absolute values');
        }

        const match = store.getMatch(matchId)

        match.updateScore(homeScore, awayScore);
        store.updateMatch(match)
    }

    finishMatch(matchId) {
        const match = store.getMatch(matchId)
        store.deleteMatch(match)
    }

    getSummary() {
        return store
            .getState()
            .matches
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


export default Scoreboard;