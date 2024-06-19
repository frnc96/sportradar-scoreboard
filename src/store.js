import { isTestEnvironment } from "./utils/misc";


class Store {
    constructor() {
        this.state = {
            matches: Object.freeze([])
        };
    }

    // Private methods
    #setState(key, value) {
        this.state[key] = value;
    }

    // Public methods
    getState() {
        return this.state;
    }

    // Matches methods
    getMatch(matchUuid) {
        const match = this.state.matches.find(
            match => match.uuid === matchUuid
        );

        if (!match) {
            throw new Error('Match not found');
        }

        return match
    }

    addMatch(match) {
        this.#setState(
            'matches',
            [...this.state.matches, match],
        );

        return true;
    }

    updateMatch(updatedMatch) {
        const matches = this.state.matches.map(match => {
            if (match.uuid === updatedMatch.uuid) {
                return updatedMatch
            }

            return match
        })

        this.#setState(
            'matches',
            matches,
        );
    }

    deleteMatch(toDeleteMatch) {
        const matches = this.state.matches.filter(
            match => match.uuid !== toDeleteMatch.uuid
        )

        this.#setState(
            'matches',
            matches,
        );
    }

    // Test specific
    reset() {
        if (!isTestEnvironment()) return;

        this.#setState(
            'matches',
            [],
        )
    }
}

// Singleton instance
const instance = new Store();
Object.freeze(instance);

export default instance;
