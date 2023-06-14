"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRecommendationManager = void 0;
class userRecommendationManager {
    constructor(_userId) {
        this.userId = _userId;
        this.usersPrefers = {
            Genres: {},
            Tags: {}
        };
    }
    /**
     * createUserRecommendationsProfile
     * fills user's index selected by given id (maybe using email to select users is better) preferred_tags and preferred_genres are changed
     * rated films should be stored in `user_{id}_title_ranks`
    */
    createUserRecommendationsProfile(rankedTitles) {
        /**
         * tagsRanks
         * Contains tag names and ranks (popularity, and average rating given to the title)
         * If the arithmetic mean of rated films with this tag is =< 5, then we won't add the value to the record
         * Rank formula is
         * PresencePercent = number of ranked films with the tag / (100 / number of ranked films)
         * AverageRating = Sum of ratings / quantity of titles
         * Rank =
         */
        const counts = {
            Tags: {},
            Genres: {}
        };
        rankedTitles.forEach(value => {
            const updateCounts = (propName, currentFilmRank, countType) => {
                if (counts[countType][propName] === undefined) {
                    counts[countType][propName] = {
                        totalNumber: 1,
                        totalRatingsSum: value.rank,
                        rank: value.rank,
                    };
                    counts[countType][propName].presenceRank = counts[countType][propName].totalNumber / (rankedTitles.length / 100);
                    return;
                }
                counts[countType][propName].totalNumber += 1;
                counts[countType][propName].totalRatingsSum += currentFilmRank;
                counts[countType][propName].rank += counts[countType][propName].totalRatingsSum / counts[countType][propName].totalNumber;
                counts[countType][propName].presenceRank = counts[countType][propName].totalNumber / (rankedTitles.length / 100);
            };
            value.tags.forEach(tagName => updateCounts(tagName, value.rank, 'Tags'));
            value.genres.forEach(genreName => updateCounts(genreName, value.rank, 'Genres'));
        });
        Object.entries(counts).forEach(([countType, props]) => {
            if (countType !== 'Tags' && countType !== 'Genres')
                return;
            Object.entries(props).forEach(([key, value]) => {
                this.usersPrefers[countType][key] = value.presenceRank !== undefined ? (value.rank * (value.presenceRank / 100)) : 0;
            });
        });
    }
    /**
     * estimateFilmRateForUser
     * @returns a number that estimates probability that the user will click and rate the film(series) positively at scale from 0 to 9 where 0 means that it's not really probable that the user will click at the film and  9 means the opposite
     */
    estimateTitleRateForUser(title) {
        if (Object.keys(this.usersPrefers.Genres).length === 0 || Object.keys(this.usersPrefers.Tags).length === 0) {
            throw new Error("No recommendation profile has been generated");
        }
        // TODO in designing the formula that would estimate how high will most likely the user rate the film consider that preferred genre should have bigger impact than the tags
        const tagsRankSum = title.tags.map(genre => this.usersPrefers.Genres[genre]).reduce((prev, curr) => prev + curr);
        const genreRankSum = title.genres.map(genre => this.usersPrefers.Genres[genre]).reduce((prev, curr) => prev + curr);
        return 0;
    }
    // private getRecommendationsBasedOnTags() {
    // }
    // private getRecommendationsBasedOnGenre() {
    // }
    // /**
    //  * getRecommendations
    //  * @returns 
    //  */
    // public getRecommendations() {
    // }
    sortByEstimatedUserFilmRate(unsortedFilms) {
        return new Array(256);
    }
}
exports.userRecommendationManager = userRecommendationManager;
