import React, { useState } from "react";
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

function Footer() {
  const [sliderValue, setSliderValue] = useState(40);
  const onSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };
  return (
    <div className="footer">
      <div className="footer__left">
        <img className="footer__albumlogo" src="" alt="" />
        <div className="footer__songInfo">
          <h4>Your song</h4>
          <p>...</p>
        </div>
      </div>
      <div className="footer__center">
        <ShuffelIcon className="footer__green" />
        <SkipPreviousIcon className="footer__icon" />
        <PlayCircleOutlineIcon className="footer__icon" fontSize="large" />
        <SkipNextIcon className="footer__icon" />
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
