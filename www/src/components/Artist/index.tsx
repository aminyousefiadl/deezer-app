import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Loader } from "..";
import { convertSecToMin } from "../../utils/convertSecToMin";
import { IAlbum, ITrack } from "../types/ITrack";

const Artist = () => {
  const { id } = useParams();

  const navigator = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    topTracks: { data: [] },
    albums: { data: [] },
    artist: { name: "", picture: "", nb_fan: 0, id: "" },
  });

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_BASE_URL}/artist?artistId=${id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result?.data);
        },
        (error) => {
          console.log({ error });
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="artist">
      <section className="banner">
        <div
          className="summary"
          style={
            data.artist.picture
              ? {
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.95), rgba(1, 1, 0, 0.45)),
      url(${data.artist.picture})`,
                }
              : {}
          }
        >
          <span
            onClick={() => {
              navigator(-1);
            }}
            className="return"
          >
            Back to Home
          </span>
          <div className="text-wrapper">
            <h1>{data.artist.name}</h1>
            <span className="fans">{data.artist.nb_fan} fan</span>
            <p className="description">
              Lorem Miposom Lorem Miposom Lorem Miposom Lorem Miposom Lorem
              Miposom Lorem Miposom Lorem MiposomLorem Miposom Lorem Miposom
              Lorem Miposom Lorem Miposom
            </p>
          </div>
        </div>
        {data?.topTracks?.data.length !== 0 && (
          <div className="track-wrapper">
            <h2>Top Tracks</h2>
            {data?.topTracks?.data.map((el: ITrack, i) => (
              <div className="track">
                <div className="flex-row">
                  <h5>
                    {" "}
                    {i + 1 + " "} {el.title}
                  </h5>
                </div>
                <span>{convertSecToMin(el.duration)}</span>
              </div>
            ))}
          </div>
        )}
      </section>
      {data.albums?.data?.length !== 0 && (
        <section className="albums-wrapper">
          <h2>Albums</h2>
          <div className="albums">
            {data.albums?.data?.map((el: IAlbum) => (
              <Card
                isAlbum={true}
                key={el.id}
                {...el}
                album={{ cover_medium: el.cover_medium }}
                artist={{ name: data.artist.name, id: data.artist.id }}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export { Artist };
