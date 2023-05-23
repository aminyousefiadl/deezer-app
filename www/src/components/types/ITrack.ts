export interface ITrack {
  title: string;
  artist: { name: string; id: string };
  isAlbum?: boolean;
  album: { cover_medium: string };
  duration: number;
  id: string;
}

export interface IAlbum extends ITrack {
  cover_medium: string;
}
