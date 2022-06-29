import { createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { paste } from "../../src/util";

//
export const FLAG_TEST = "xjxjrdhdhly";
export const FLAG_FEEDS_LOADING = "uxvwhrdoupc";
//
const initialState = {
  [FLAG_TEST]: null,
};

export const flagsSlice = createSlice({
  name: "flags",
  initialState,
  reducers: {
    toggleFlag: (state, action) => {
      state[action.payload] = !state[action.payload];
    },
    toggleFlagOn: (state, action) => {
      state[action.payload] = true;
    },
    toggleFlagOff: (state, action) => {
      state[action.payload] = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleFlag, toggleFlagOn, toggleFlagOff } = flagsSlice.actions;

export default flagsSlice.reducer;

//
// export redux store shortcut
export function useFlags() {
  //
  const flags = useSelector((state) => state.flags);
  const dispatch = useDispatch();
  //
  const handle = paste((name) => flags[name], {
    debug: () => JSON.stringify(flags, null, 2),
    off: (name) => dispatch(toggleFlagOff(name)),
    on: (name) => dispatch(toggleFlagOn(name)),
    toggle: (name) => dispatch(toggleFlag(name)),
  });
  //
  return handle;
}
