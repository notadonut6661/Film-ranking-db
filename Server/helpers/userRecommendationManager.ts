import dbConnection from './dbConnection';

interface TitleAnalyticsData {
  id: string;
  rank: number;
  tags: Array<string>;
  genres: Array<string>;
}

interface UserPreferencesCounts {
  totalNumber: number;
  totalRatingsSum: number;
  rank: number;
  presenceRank?: number;
}


export class userRecommendationManager {
  public userId: number;
  private usersPrefers: {
    Genres: Record<string, number>,
    Tags: Record<string, number>
  }

  constructor(_userId: number) {
    this.userId = _userId;
    this.usersPrefers = {
      Genres: {},
      Tags: {}
    }
  }

  /**
   * createUserRecommendationsProfile
   * fills user's index selected by given id (maybe using email to select users is better) preferred_tags and preferred_genres are changed
   * rated films should be stored in `user_{id}_title_ranks`
  */
  public createUserRecommendationsProfile(rankedTitles: Array<TitleAnalyticsData>): void {

    /**
     * If the arithmetic mean of rated films with this tag is =< 5, then we won't add the value to the record
     */
    const counts: {
      Tags: Record<string, UserPreferencesCounts>,
      Genres: Record<string, UserPreferencesCounts>
    } = {
      Tags: {},
      Genres: {}
    }

    rankedTitles.forEach(value => {
      const updateCounts = (propName: string, currentFilmRank: number, countType: 'Tags' | 'Genres'): void => {
        if (counts[countType][propName] === undefined) {
          counts[countType][propName] = {
            totalNumber: 1,
            totalRatingsSum: value.rank,
            rank: value.rank,
          }
          counts[countType][propName].presenceRank = counts[countType][propName].totalNumber / (rankedTitles.length / 100)

          return;
        }

        counts[countType][propName].totalNumber += 1;
        counts[countType][propName].totalRatingsSum += currentFilmRank;
        counts[countType][propName].rank += counts[countType][propName].totalRatingsSum / counts[countType][propName].totalNumber;
        counts[countType][propName].presenceRank = counts[countType][propName].totalNumber / (rankedTitles.length / 100);
      }

      value.tags.forEach(tagName => updateCounts(tagName, value.rank, 'Tags'));
      value.genres.forEach(genreName => updateCounts(genreName, value.rank, 'Genres'));
    });

    Object.entries(counts).forEach(([countType, props]) => {
      if (countType !== 'Tags' && countType !== 'Genres') return;
      Object.entries(props).forEach(([key, value]) => {
        this.usersPrefers[countType][key] = value.presenceRank !== undefined ? (value.rank * (value.presenceRank / 100)) : 0;
      })
    });

  }

  /**
   * estimateFilmRateForUser
   * @returns a number that estimates probability that the user will click and rate the film(series) positively at scale from 0 to 9 where 0 means that it's not really probable that the user will click at the film and  9 means the opposite  
   */
  private estimateTitleRateForUser(title: TitleAnalyticsData): number {
    if (Object.keys(this.usersPrefers.Genres).length === 0 || Object.keys(this.usersPrefers.Tags).length === 0) {
      throw new Error("No recommendation profile has been generated");
    }

    const WEIGHTS = Object.freeze({
      TAG: 0.2,
      GENRE: 0.8  
    });

    // FIXME current time complexity is O(2n + 2k), increase the performance of the algorithm
    const tagsRankSum: number = Math.max(title.tags.map(genre => this.usersPrefers.Genres[genre]).reduce((prev, curr) => prev + curr), 9);
    const genreRankSum: number = Math.max(title.genres.map(genre => this.usersPrefers.Genres[genre]).reduce((prev, curr) => prev + curr), 9);
   // FIXME END

    return genreRankSum * WEIGHTS.GENRE + tagsRankSum * WEIGHTS.TAG;
  }

  /**
   * getRecommendations
   * @returns 
   */
  public async getRecommendations(p_RecommendationListLength: number): Promise<Array<string>> {
    let filmsInPreferredGenreQuery = `SELECT * FROM user_${this.userId}_title_ranks WHERE `;

    for (const key in this.usersPrefers.Genres) {
      if (this.usersPrefers.Genres[key] < 5) break;

      filmsInPreferredGenreQuery += `${key} = 1`; // 1 is used as boolean true here
    }

    const filmsInPreferredGenre = (await (await dbConnection).query(filmsInPreferredGenreQuery)) as Array<Record<string, any>>;
    const filmsInPreferredGenreAnalyticsData: TitleAnalyticsData[] = [];

    filmsInPreferredGenre.forEach(title => {
      Object.entries(title).forEach(([key, value], index) => {
        if(!key.includes('genre')  && !key.includes('tag') || value === 0) return;

        const dataType = key.includes('genre') ? 'genres' : 'tags';
        
        if(filmsInPreferredGenreAnalyticsData[index] === undefined) {

          filmsInPreferredGenreAnalyticsData[index] = { 
            id: title.id,
            rank: title?.rank,
            genres: dataType === 'genres' ? [key] : [],
            tags: dataType === 'tags' ? [key] : []
        };
        return;
      } 
        
        filmsInPreferredGenreAnalyticsData[index][dataType].push(key);
      })
    });


    return this.sortByEstimatedUserFilmRate(filmsInPreferredGenreAnalyticsData).map(({id: titleName}) => titleName);
  }

  public sortByEstimatedUserFilmRate(unsortedFilms: Array<TitleAnalyticsData>): Array<TitleAnalyticsData> {
    return unsortedFilms.sort((a, b) => {
      return this.estimateTitleRateForUser(a) - this.estimateTitleRateForUser(b);
    });
  }

}
