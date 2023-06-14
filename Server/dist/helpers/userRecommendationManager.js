"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRecommendationManager = void 0;
const dbConnection_1 = __importDefault(require("./dbConnection"));
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
         * If the arithmetic mean of rated films with this tag is =< 5, then we won't add the value to the record
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
        const tagsRankSum = title.tags.map(genre => this.usersPrefers.Genres[genre]).reduce((prev, curr) => prev + curr);
        const genreRankSum = title.genres.map(genre => this.usersPrefers.Genres[genre]).reduce((prev, curr) => prev + curr);
        return Math.pow(genreRankSum, 2) + tagsRankSum;
    }
    /**
     * getRecommendations
     * @returns
     */
    getRecommendations(recommendationListLength) {
        return __awaiter(this, void 0, void 0, function* () {
            let filmsInPreferredGenreQuery = `SELECT * FROM user_${this.userId}_title_ranks WHERE `;
            for (const key in this.usersPrefers.Genres) {
                if (this.usersPrefers.Genres[key] < 5)
                    break;
                filmsInPreferredGenreQuery += `${key} = 1`;
            }
            const filmsInPreferredGenre = (yield (yield dbConnection_1.default).query(filmsInPreferredGenreQuery));
            const filmsInPreferredGenreAnalyticsData = [];
            filmsInPreferredGenre.forEach(title => {
                Object.entries(title).forEach(([key, value], index) => {
                    if (!key.includes('genre') && !key.includes('tag') || value === 0)
                        return;
                    const dataType = key.includes('genre') ? 'genres' : 'tags';
                    if (filmsInPreferredGenreAnalyticsData[index] === undefined) {
                        filmsInPreferredGenreAnalyticsData[index] = {
                            id: title.id,
                            rank: title === null || title === void 0 ? void 0 : title.rank,
                            genres: dataType === 'genres' ? [key] : [],
                            tags: dataType === 'tags' ? [key] : []
                        };
                        return;
                    }
                    console.log(filmsInPreferredGenreAnalyticsData[index]);
                    filmsInPreferredGenreAnalyticsData[index][dataType].push(key);
                });
            });
            return this.sortByEstimatedUserFilmRate(filmsInPreferredGenreAnalyticsData).map(({ id: titleName }) => titleName);
        });
    }
    sortByEstimatedUserFilmRate(unsortedFilms) {
        return unsortedFilms.sort((a, b) => {
            return this.estimateTitleRateForUser(a) - this.estimateTitleRateForUser(b);
        });
    }
}
exports.userRecommendationManager = userRecommendationManager;
