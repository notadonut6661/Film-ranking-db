"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRecommendationManager = void 0;
class userRecommendationManager {
    constructor(_userId) {
        this.userId = _userId;
        this.usersPrefers = {};
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
            tags: {},
            genres: {}
        };
        const tagRanks = {};
        const genreRanks = {};
        const tagPresenseRanks = {};
        Object.values(rankedTitles).forEach(value => {
            value.tags.forEach(([tagName]) => {
                counts.tags[tagName].totalNumber += 1;
            });
            // value.genres.forEach(([tagName]) => })
        });
        console.log(rankedTitles);
    }
    /**
     * estimateFilmRateForUser
     * @returns a number that estimates probability that the user will click and rate the film(series) positively at scale from 0 to 9 where 0 means that it's not really probable that the user will click at the film and  9 means the opposite
     */
    estimateFilmRateForUser() {
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