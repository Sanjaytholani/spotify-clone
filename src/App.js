import { useEffect } from "react";
import "./App.css";
import Login from "./Login";
import { getToken } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./DataLayer";
import Player from "./Player";

const spotify = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useDataLayerValue();
  useEffect(() => {
    const hash = getToken();
    window.location.hash = "";
    let _token = hash.access_token;
    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
      spotify.setAccessToken(_token);
      spotify
        .getMe()
        .then((user) =>
          dispatch({
            type: "SET_USER",
            user,
          })
        )
        .catch((err) => console.log(err));
      spotify.getUserPlaylists().then((playlist) => {
        dispatch({
          type: "SET_PLAYLIST",
          playlist,
        });
      });
      spotify.getPlaylist("37i9dQZEVXcHGgkzaBRNv1").then((response) =>
        dispatch({
          type: "SET_DISCWEEKLY",
          response,
        })
      );
      spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );
      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });
    }
  }, [token, dispatch]);
  return (
    <div className="App">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
