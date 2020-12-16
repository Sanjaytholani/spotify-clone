import { Favorite, MoreHoriz, PlayCircleFilled } from "@material-ui/icons";
import React from "react";
import "./Body.css";
import { useDataLayerValue } from "./DataLayer";
import Header from "./Header";
import SongRow from "./SongRow";
function Body({ spotify }) {
  const [{ discoverWeekly }, dispatch] = useDataLayerValue();
  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:37i9dQZF1EM2wDEq3mb7Bq`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        console.log(res);
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="body">
      <Header spotify={spotify} />
      <div className="body__info">
        <img src={discoverWeekly?.images[0]?.url} alt="discover-weekly" />
        <div className="body__info__text">
          <strong>PLAYLIST</strong>
          <h2>Top 2020</h2>
          <p>{discoverWeekly?.description}</p>
        </div>
      </div>
      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilled className="body__shuffle" onClick={playPlaylist} />
          <Favorite fontSize="large" />
          <MoreHoriz />
        </div>
        {discoverWeekly?.tracks.items.map((item) => (
          <SongRow playSong={playSong} track={item.track} />
        ))}
      </div>
    </div>
  );
}

export default Body;
