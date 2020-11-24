import React from "react";
import "./SideBar.css";
import SideBarOptions from "./SideBarOptions";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { useDataLayerValue } from "./DataLayer";
function SideBar() {
  const [{ playlists }, dispatch] = useDataLayerValue();
  // console.log(playlist);
  return (
    <div className="sidebar">
      <img
        className="sidebar__logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="spotify-logo"
      />
      <SideBarOptions title="Home" Icon={HomeIcon} />
      <SideBarOptions title="Search" Icon={SearchIcon} />
      <SideBarOptions title="Your Library" Icon={LibraryMusicIcon} />
      <br />
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />
      {playlists?.items?.map((playlist) => (
        <SideBarOptions title={playlist.name} />
      ))}
    </div>
  );
}

export default SideBar;
