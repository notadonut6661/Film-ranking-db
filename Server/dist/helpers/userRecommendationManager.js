"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRecommendationManager = void 0;
class userRecommendationManager {
    constructor(_userId) {
        this.userId = _userId;
    }
    createUserRecommendationsProfile() {
        console.log('');
    }
    /**
     * estimateFilmRateForUser
     * @returns a number that estimates probability that the user will click and rate the film(series) positively at scale from 0 to 9 where 0 means that it's not really probable that the user will click at the film and  9 means the opposite
     */
    estimateFilmRateForUser() {
        return 0;
    }
    getRecommendationsBasedOnTags() {
    }
    getRecommendationsBasedOnGenre() {
    }
    /**
     * getRecommendations
     * @returns
     */
    getRecommendations() {
    }
    sortByEstimatedUserFilmRate(unsortedFilms) {
        return new Array(256);
    }
}
exports.userRecommendationManager = userRecommendationManager;
