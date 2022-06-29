import q from "nikolav-q";
import { has } from "./has";
import stripEndSlashes from "./strip-end-slashes";
import noop from "./noop";
import { prevent } from "./prevent";
import sortByTimestampDesc from "./sort-by-timestamp-desc";
//
const paste = q.object.paste;

export { paste, has, stripEndSlashes, noop, prevent, sortByTimestampDesc };
