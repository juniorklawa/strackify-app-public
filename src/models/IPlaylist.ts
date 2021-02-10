import { IBook } from './IBook';

export interface IPlayList {
  _id: string;
  name: string;
  title: string;
  author: string;
  votes: number;
  musics: number;
  favNumber: number;
  description: string;
  creatorId: string;
  playlistCoverSource: string;
  playlistUrl: string;
  creator: string;
  recommendedBooks: IBook[];
}
