import Scoreboard from '../index';
import store from '../src/store';


describe('Scoreboard', () => {
    let scoreboard;

    beforeEach(() => {
        scoreboard = new Scoreboard();
        store.reset();
    });

    test('should start a new match', () => {
        scoreboard.startMatch('Italy', 'Germany');

        expect(scoreboard.getSummary()).toEqual([
            { homeTeam: 'Italy', awayTeam: 'Germany', homeScore: 0, awayScore: 0 }
        ]);
    });

    test('should throw an error if team names are not strings', () => {
        expect(() => {
            scoreboard.startMatch("0", 1);
        }).toThrow('Team names should be strings');

        expect(() => {
            scoreboard.startMatch(0, "1");
        }).toThrow('Team names should be strings');
    });

    test('should update the score of an ongoing match', () => {
        let matchId = scoreboard.startMatch('Italy', 'Germany');
        scoreboard.updateScore(matchId, 3, 1);

        expect(scoreboard.getSummary()).toEqual([
            { homeTeam: 'Italy', awayTeam: 'Germany', homeScore: 3, awayScore: 1 }
        ]);
    });

    test('should throw an error if match not found', () => {
        let matchId = "random-match-id"

        expect(() => {
            scoreboard.updateScore(matchId, 0, 2);
        }).toThrow('Match not found');
    });

    test('should throw an error if non absolute scores are provided', () => {
        let matchId = scoreboard.startMatch('Portugal', 'Norway');

        expect(() => {
            scoreboard.updateScore(matchId, -1, 2);
        }).toThrow('Scores must be absolute values');

        expect(() => {
            scoreboard.updateScore(matchId, 1, -2);
        }).toThrow('Scores must be absolute values');

        expect(() => {
            scoreboard.updateScore(matchId, 1.5, 2);
        }).toThrow('Scores must be absolute values');

        expect(() => {
            scoreboard.updateScore(matchId, 1, 2.5);
        }).toThrow('Scores must be absolute values');
    });

    test('should throw error when attempting to finish non existent match', () => {
        expect(() => {
            scoreboard.finishMatch('random-match-id');
        }).toThrow('Match not found');
    });

    test('should finish an ongoing match', () => {
        const matchId = scoreboard.startMatch('Spain', 'Croatia');
        scoreboard.finishMatch(matchId);

        expect(scoreboard.getSummary()).toEqual([]);
    });

    test('should get a summary of matches in progress ordered by total score', () => {
        setTimeout(() => {
            let matchId = scoreboard.startMatch('Mexico', 'Canada');
            scoreboard.updateScore(matchId, 0, 5);
        }, 100);

        setTimeout(() => {
            let matchId = scoreboard.startMatch('Spain', 'Brazil');
            scoreboard.updateScore(matchId, 10, 2);
        }, 200);

        setTimeout(() => {
            let matchId = scoreboard.startMatch('Germany', 'France');
            scoreboard.updateScore(matchId, 2, 2);
        }, 300);

        setTimeout(() => {
            let matchId = scoreboard.startMatch('Uruguay', 'Italy');
            scoreboard.updateScore(matchId, 6, 6);
        }, 400);

        setTimeout(() => {
            let matchId = scoreboard.startMatch('Argentina', 'Australia');
            scoreboard.updateScore(matchId, 3, 1);
        }, 500);

        setTimeout(() => {            
            expect(scoreboard.getSummary()).toEqual([
                { homeTeam: 'Uruguay', awayTeam: 'Italy', homeScore: 6, awayScore: 6 },
                { homeTeam: 'Spain', awayTeam: 'Brazil', homeScore: 10, awayScore: 2 },
                { homeTeam: 'Mexico', awayTeam: 'Canada', homeScore: 0, awayScore: 5 },
                { homeTeam: 'Argentina', awayTeam: 'Australia', homeScore: 3, awayScore: 1 },
                { homeTeam: 'Germany', awayTeam: 'France', homeScore: 2, awayScore: 2 },
            ]);
        }, 600);
    });
});
