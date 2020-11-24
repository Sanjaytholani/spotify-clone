export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  //TODO:Remove after finish
  token: null,
  //"BQD3bXo-ZwtBrKyL2TcacrQSfbaw7NGjA0Oz6dlo9Cq91eBOGJfWnIO09B8tIeIR5guZAryT_5oJ-SvcQOxq31fxJG7UH_NPjv8bBpgK2VL9n3lO9mdWL4MnwCjQFzfwQg7G2wvneCEV_wh7t80zHGVdRUPVpAZNUD3gXI2fjQu6qXTa",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_PLAYLIST":
      return {
        ...state,
        playlists: action.playlist,
      };
    default:
      return state;
  }
};

export default reducer;
