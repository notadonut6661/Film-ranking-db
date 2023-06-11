export class userRecommendationManager  {
  private userId: number;

  constructor(_userId: number) {
    this.userId = _userId;
  }
  /**
   * createUserRecommendationsProfile
   * fills user's index selected by given id (maybe using email to select users is better) preferred_tags and preferred_genres are changed
  */
  public createUserRecommendationsProfile(): void {
    console.log('');
  }

  /**
   * estimateFilmRateForUser
   * @returns a number that estimates probability that the user will click and rate the film(series) positively at scale from 0 to 9 where 0 means that it's not really probable that the user will click at the film and  9 means the opposite  
   */
  private estimateFilmRateForUser(): number {
    return 0;
  }

  private getRecommendationsBasedOnTags() {

  }

  private getRecommendationsBasedOnGenre() {

  }
  
  /**
   * getRecommendations
   * @returns 
   */
  public getRecommendations() {
    
  }

  public sortByEstimatedUserFilmRate<T>(unsortedFilms: Array<T>): Array<T> {
    return new Array<T>(256);
  }

}
