import { UriDecoder } from './../helpers/uriDecoder';
import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import dbConnection from '../helpers/dbConnection';
import { Route } from "./Route.class"

enum SupportedServices {
  HULU, AMAZON, MEGOGO, NETFLIX
}

enum ApprovalConclusion {
  Approve, Disapprove, Pass, Change
}

enum ApprovableTables {
  Films, TvShow
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
      const { insertId } = await con.query(`INSERT INTO \`titles-to-approve\` (\`title\`, \`assignee_id\`) VALUES ('${req.body.title}', ${await this.getAdminToAssign()} )`);

      req.body.genres.forEach(genre => {
        con.query(`INSERT INTO \`genres\` (name, titleId) VALUES ('${genre}', ${insertId})`); 
      });
    } catch (err) {
      console.error(err);
    }
  }

  public override async Patch(req: Request<ParamsDictionary, any, { titleId: number, approveType: ApprovableTables }, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
    const con = await dbConnection;

    try {
      const { assignee } = await con.query(`SELECT assignee FROM ${req.body.approveType}-to-approve WHERE id = ${req.body.titleId}`);

      await con.query(`UPDATE \`${req.body.approveType}-to-approve \`
      SET \`assignee\` = ${await this.getAdminToAssign()} 
      WHERE \`id\` = ${req.body.titleId}`);
      
      con.query(`UPDATE \`admins\` 
      SET \`assignments\` = \`assignments\` - 1
      WHERE \`id\` = ${assignee}`);
    } catch (err) {
      console.error(err);
      
    }
  }

  public override async Delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
    const con = await dbConnection;
    try {
      const { assignee } = await con.query(`SELECT assignee FROM ${req.body.approveType}-to-approve WHERE id = ${req.body.titleId}`);

      con.query(`DELETE FROM \`titles-to-approve\` WHERE id = ${req.body.titleId}`);
      con.query(`UPDATE \`admins\` 
      SET \`assignments\` = \`assignments\` - 1
      WHERE \`id\` = ${assignee}`);
    } catch (err) {
      console.error(err);
      
    }
  }

  /**
   * @returns An id of the best admin candidate to assign for title approval, or nothing since throws an error.
   */
  private async getAdminToAssign(): Promise<number | never> {
    const con = await dbConnection;

    const [{id: freeModerator}] = await con.query(`SELECT id from admins WHERE assignments=(SELECT min(assignments) FROM admins);`);

    if ('number' != typeof freeModerator) throw new Error("");
    
    return freeModerator;
  }

}
