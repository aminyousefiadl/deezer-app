import { Link } from "react-router-dom";
import { convertSecToMin } from "../../utils/convertSecToMin";
import { ITrack } from "../types/ITrack";

const Card = ({ title, artist, isAlbum, album, duration }: ITrack) => {
  return (
    <div className="link">
      <div className="card" style={isAlbum ? { width: 240 } : {}}>
        <img
          src={album.cover_medium}
          alt={title}
          height={220}
          width="100%"
          className="cover"
        />
        {!!duration && (
          <span className="duration">{convertSecToMin(duration)}</span>
        )}
        <h3 className="song">{title}</h3>
        {!isAlbum && (
          <Link to={`/artist/${artist.id}`} className="link">
            <h6 className="singer">{artist.name}</h6>
          </Link>
        )}
      </div>
    </div>
  );
};

export { Card };
