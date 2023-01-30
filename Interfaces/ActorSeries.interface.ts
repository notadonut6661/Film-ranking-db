export interface Actor {
  name: string;
  character: string;
  episodes_number: number; // Number of episodes actor was in
  episodes: Array<string> | Array<number>; // Array with either episode names or episode id's
}
