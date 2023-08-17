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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRecommendationManager = void 0;
var dbConnection_1 = __importDefault(require("./dbConnection"));
var userRecommendationManager = (function () {
    function userRecommendationManager(_userId) {
        this.userId = _userId;
        this.usersPrefers = {
            Genres: {},
            Tags: {}
        };
    }
    userRecommendationManager.prototype.createUserRecommendationsProfile = function (rankedTitles) {
        var _this = this;
        var counts = {
            Tags: {},
            Genres: {}
        };
        rankedTitles.forEach(function (value) {
            var updateCounts = function (propName, currentFilmRank, countType) {
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
            value.tags.forEach(function (tagName) { return updateCounts(tagName, value.rank, 'Tags'); });
            value.genres.forEach(function (genreName) { return updateCounts(genreName, value.rank, 'Genres'); });
        });
        Object.entries(counts).forEach(function (_a) {
            var countType = _a[0], props = _a[1];
            if (countType !== 'Tags' && countType !== 'Genres')
                return;
            Object.entries(props).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                _this.usersPrefers[countType][key] = value.presenceRank !== undefined ? (value.rank * (value.presenceRank / 100)) : 0;
            });
        });
    };
    userRecommendationManager.prototype.estimateTitleRateForUser = function (title) {
        var _this = this;
        if (Object.keys(this.usersPrefers.Genres).length === 0 || Object.keys(this.usersPrefers.Tags).length === 0) {
            throw new Error("No recommendation profile has been generated");
        }
        var WEIGHTS = Object.freeze({
            TAG: 0.2,
            GENRE: 0.8
        });
        var tagsRankSum = Math.max(title.tags.map(function (genre) { return _this.usersPrefers.Genres[genre]; }).reduce(function (prev, curr) { return prev + curr; }), 9);
        var genreRankSum = Math.max(title.genres.map(function (genre) { return _this.usersPrefers.Genres[genre]; }).reduce(function (prev, curr) { return prev + curr; }), 9);
        return genreRankSum * WEIGHTS.GENRE + tagsRankSum * WEIGHTS.TAG;
    };
    userRecommendationManager.prototype.getRecommendations = function (p_RecommendationListLength) {
        return __awaiter(this, void 0, void 0, function () {
            var filmsInPreferredGenreQuery, key, filmsInPreferredGenre, filmsInPreferredGenreAnalyticsData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filmsInPreferredGenreQuery = "SELECT * FROM user_".concat(this.userId, "_title_ranks WHERE ");
                        for (key in this.usersPrefers.Genres) {
                            if (this.usersPrefers.Genres[key] < 5)
                                break;
                            filmsInPreferredGenreQuery += "".concat(key, " = 1");
                        }
                        return [4, dbConnection_1.default];
                    case 1: return [4, (_a.sent()).query(filmsInPreferredGenreQuery)];
                    case 2:
                        filmsInPreferredGenre = (_a.sent());
                        filmsInPreferredGenreAnalyticsData = [];
                        filmsInPreferredGenre.forEach(function (title) {
                            Object.entries(title).forEach(function (_a, index) {
                                var key = _a[0], value = _a[1];
                                if (!key.includes('genre') && !key.includes('tag') || value === 0)
                                    return;
                                var dataType = key.includes('genre') ? 'genres' : 'tags';
                                if (filmsInPreferredGenreAnalyticsData[index] === undefined) {
                                    filmsInPreferredGenreAnalyticsData[index] = {
                                        id: title.id,
                                        rank: title === null || title === void 0 ? void 0 : title.rank,
                                        genres: dataType === 'genres' ? [key] : [],
                                        tags: dataType === 'tags' ? [key] : []
                                    };
                                    return;
                                }
                                filmsInPreferredGenreAnalyticsData[index][dataType].push(key);
                            });
                        });
                        return [2, this.sortByEstimatedUserFilmRate(filmsInPreferredGenreAnalyticsData).map(function (_a) {
                                var titleName = _a.id;
                                return titleName;
                            })];
                }
            });
        });
    };
    userRecommendationManager.prototype.sortByEstimatedUserFilmRate = function (unsortedFilms) {
        var _this = this;
        return unsortedFilms.sort(function (a, b) {
            return _this.estimateTitleRateForUser(a) - _this.estimateTitleRateForUser(b);
        });
    };
    return userRecommendationManager;
}());
exports.userRecommendationManager = userRecommendationManager;
