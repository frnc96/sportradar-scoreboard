import { v4 as uuidv4 } from 'uuid';


class Match {
    constructor(homeTeam, awayTeam) {
        this.uuid = uuidv4()
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.homeScore = 0;
        this.awayScore = 0;
        this.timestamp = Date.now();
    }

    updateScore(homeScore, awayScore) {
        this.homeScore = homeScore;
        this.awayScore = awayScore;
    }

    getTotalScore() {
        return this.homeScore + this.awayScore;
    }
}


export default Match;