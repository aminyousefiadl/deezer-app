import { useEffect, useState, useMemo, ChangeEvent } from "react";
import debounce from "lodash.debounce";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader, Card } from "..";
import { ITrack } from "../types/ITrack";

const Home = () => {
  const navigate = useNavigate();
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);

  const [searchText, setSearchText] = useState(
    searchParams.get("search") || ""
  );
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_BASE_URL}/track?trackName=${searchText}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result?.data?.data);
        },
        (error) => {
          console.log({ error });
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchText]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    navigate(`/?search=${e.target.value}`);
    setSearchText(e.target.value);
  };

  const debouncedOnChange = useMemo(() => {
    return debounce(handleChange, 400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  });

  return (
    <div className="home">
      <h2 className="title">Welcome!</h2>
      <div className="search-bar">
        <input
          onChange={debouncedOnChange}
          className="search-box"
          placeholder="Seach your favorite track, artist, ..."
          defaultValue={searchText}
        />
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <section className="wrapper">
          {data?.map((el: ITrack) => (
            <Card key={el.id} {...el} />
          ))}
        </section>
      )}
    </div>
  );
};

export { Home };
