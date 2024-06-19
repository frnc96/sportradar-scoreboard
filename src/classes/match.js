import { v4 as uuidv4 } from 'uuid';
import store from '../store';


class Match {
    constructor(homeTeam, awayTeam) {
        this.uuid = uuidv4()
        this.index = store.getState().matches.length;
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