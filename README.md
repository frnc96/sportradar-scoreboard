# Sportradar Scoreboard

Hello Sportradar team, I've developed a simple package that fulfills all of the requirements of the task document that was sent over.

## Installing Package

1. Clone repository: `git clone https://github.com/frnc96/sportradar-scoreboard.git`
2. Navigate to directory: `cd sportradar-scoreboard`
3. Install dependencies: `npm install`

## Testing Package

To test this package with the included automated tests, simply run the following command inside the root package directory: `npm test`

## Using Package

To use this repo just like any other npm package on an other project, follow these steps:

1. Install package using npm: `npm install /path/to/sportradar-scoreboard`
2. Create a script where the package is going to be used

```
const Scoreboard = require('sportradar-scoreboard');

scoreboard = new Scoreboard();

matchId = scoreboard.startMatch('Team A', 'Team B');  // Starts a match and saves it in memory
scoreboard.updateScore(matchId, 1, 1);                // Updates the score of a certain match
scoreboard.finishMatch(matchId);                      // Finishes a match therefore removing it from the scoreboard
scoreboard.getSummary();                              // Fetches the summary of all active matches in the scoreboard
```

## Notes

Since I am storing data in memory, one of the tests did not work properly since it was dependent on a timestamp. To combat this I added a timeout function to simulate the delay that databases have in storing data. Although this solution is not optimal since it adds time to the resting pipeline, I opted for it since in a production environment this shoul not be an issue.