import React, { useState, useEffect } from "react";
import "./Footer.css";
import ShuffelIcon from "@material-ui/icons/Shuffle";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import { createMuiTheme, Grid, ThemeProvider, Slider } from "@material-ui/core";
import { VolumeMute, VolumeUp } from "@material-ui/icons";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import { useDataLayerValue } from "./DataLayer";

const muiTheme = createMuiTheme({
  overrides: {
    MuiSlider: {
      thumb: {
        color: "white",
        "&:focus, &:hover, &$active": {
          boxShadow: "none",
        },
      },
      track: {
        color: "#1ed15e",
      },
      rail: {
        color: "grey",
      },
    },
  },
});

function Footer({ spotify }) {
  const [{ token, item, playing }, dispatch] = useDataLayerValue();
  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      console.log(r);

      dispatch({
        type: "SET_PLAYING",
        playing: r.is_playing,
      });

      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
    });
  }, [spotify, dispatch]);
  const [sliderValue, setSliderValue] = useState(40);
  const onSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };
  const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    }
  };

  const skipNext = () => {
    spotify.skipToNext();
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
  };

  const skipPrevious = () => {
    spotify.skipToPrevious();
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
  };

  return (
    <div className="footer">
      <div className="footer__left">
        <img
          className="footer__albumlogo"
          src={item?.album.images[0].url}
          alt={item?.name}
        />
        {item ? (
          <div className="footer__songInfo">
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
        ) : (
          <div className="footer__songInfo">
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>
      <div className="footer__center">
        <ShuffelIcon className="footer__green" />
        <SkipPreviousIcon onClick={skipNext} className="footer__icon" />
        {playing ? (
          <PauseCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        )}
        <SkipNextIcon onClick={skipPrevious} className="footer__icon" />
        <RepeatIcon className="footer__green" />
      </div>
      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            {sliderValue > 60 ? (
              <VolumeUp />
            ) : sliderValue === 0 ? (
              <VolumeMute />
            ) : (
              <VolumeDownIcon />
            )}
          </Grid>
          <Grid item xs>
            <ThemeProvider theme={muiTheme}>
              <Slider value={sliderValue} onChange={onSliderChange} />
            </ThemeProvider>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
