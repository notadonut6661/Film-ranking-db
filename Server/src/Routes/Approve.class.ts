import { UriDecoder } from './../helpers/uriDecoder';
import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import dbConnection from '../helpers/dbConnection';
import { Route } from "./Route.class"

enum SupportedServices {
  HULU, AMAZON, MEGOGO, NETFLIX
}

type Title = {
  title: string;
  durationMin: number;
  release_date: Date;
  cast: Map<string, {
    actorId: number,
    episodePresence?: number
  }>;
  services: Map<SupportedServices, string>;
  genres: Array<string>;
  tags: Array<string>;
}

export class Approve extends Route {
  protected routeName: string;
  protected uriDecoder: UriDecoder;
  
  constructor() {
    super();
    this.routeName = "Approve";
    this.uriDecoder = new UriDecoder([]);
  }

  public override async Get(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
    const con = await dbConnection;
    const { adminId } = this.uriDecoder.Decode(req.originalUrl);
    const query = `SELECT * FROM \`titles-to-approve\` WHERE assignee = ${adminId}`;

    try {
      const assignedTitles = await con.query(query);
      
      res.json(assignedTitles.map(async (title: Title & {id: number, assignee: number} ) => {
       return {
        ...title,
        genres: [...(await con.query(`SELECT * FROM titles-genres WHERE id = ${title?.id}`))]
       }
      }));
    } catch (err) {
      console.error(err);
      res.send(err).status(404);
    } 
  }

     
  public override async Post(req: Request<ParamsDictionary, any, Title, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
    const con = await dbConnection;
    
    try {
      const { insertId } = await con.query(`INSERT INTO \`titles-to-approve\` (title, assignee) VALUES (${req.body.title}, ${await this.getAdminToAssign()})`);

      req.body.genres.forEach(genre => {
        con.query(`INSERT INTO \`genres\` (name, titleId) VALUES (${genre}, ${insertId})`);
      });
    } catch (err) {
      console.error(err);
    }
  
  }

  public override Patch(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
    
  }


  /**
   * @returns An id of the best admin candidate to assign for title approval, or nothing since throws an error.
   */
  private async getAdminToAssign(): Promise<number | never> {
    const con = await dbConnection;

    const [ freeModerator ] = await con.query(`SELECT * from admins WHERE assignments=(SELECT min(assignments) FROM admins);`);

    return freeModerator as number;
  }

}
