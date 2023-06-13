import dbConnection from './dbConnection';

interface TitleAnalyticsData {
  rank: number;
  tags: Array<string>;
  genres: Array<string>;
}

export class userRecommendationManager  {
  public userId: number;
  private usersPrefers: {
    Genre?: Record<string, number>,
    Tag?:  Record<string, number>
  }

  constructor(_userId: number) {
    this.userId = _userId;
    this.usersPrefers = {}
  }

  /**
   * createUserRecommendationsProfile
   * fills user's index selected by given id (maybe using email to select users is better) preferred_tags and preferred_genres are changed
   * rated films should be stored in `user_{id}_title_ranks`
  */
  public createUserRecommendationsProfile(rankedTitles: Array<TitleAnalyticsData>): void {
    /**
     * tagsRanks
     * Contains tag names and ranks (popularity, and average rating given to the title)
     * If the arithmetic mean of rated films with this tag is =< 5, then we won't add the value to the record
     * Rank formula is 
     * PresencePercent = number of ranked films with the tag / (100 / number of ranked films) 
     * AverageRating = Sum of ratings / quantity of titles 
     * Rank =
     */

    const counts: {
      tags: Record<string, {
        totalNumber: number,
        totalRatingsSum: number,
        rank: number,
      }>,
      genres: Record<string, {
        totalNumber: number,
        totalRatingsSum: number,
        rank: number,
      }>
    } = {
      tags: {},
      genres: {}
    }

    const tagRanks: Record<string, number> = {};
    const genreRanks: Record<string, number> = {};
    const tagPresenseRanks: Record<string, number> = {};
  
    rankedTitles.forEach(value => {
      const updateCounts = (propName: string, currentFilmRank: number, countType: 'tags' | 'genres'): void => {
        if(counts[countType][propName] === undefined) {
          counts[countType][propName] = {
            totalNumber: 1,
            totalRatingsSum: value.rank,
            rank: value.rank
          }
          return;
        }
        
        counts[countType][propName].totalNumber += 1;
        counts[countType][propName].totalRatingsSum += currentFilmRank;
        counts[countType][propName].rank += currentFilmRank;
      }
      
      value.tags.forEach(tagName => updateCounts(tagName, value.rank, 'tags'));
      value.genres.forEach(genreName => updateCounts(genreName, value.rank, 'genres'))
    });

  }

  /**
   * estimateFilmRateForUser
   * @returns a number that estimates probability that the user will click and rate the film(series) positively at scale from 0 to 9 where 0 means that it's not really probable that the user will click at the film and  9 means the opposite  
   */
  private estimateFilmRateForUser(): number {
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

  public sortByEstimatedUserFilmRate<T>(unsortedFilms: Array<T>): Array<T> {
    return new Array<T>(256);
  }

}
