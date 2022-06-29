import { useAppData, ADMIN, TEST, DISPAY_ARTICLE, APP_NOTIFICATION } from "./slice-appdata";
import { useFlags, FLAG_TEST, FLAG_FEEDS_LOADING } from "./slice-flags";
import { useArticles } from "./resource";
import { stripEndSlashes } from "../../src/util";
//
const API_URL_dev = "http://localhost:3031/api";
const API_URL_production = "https://demo-enyosolutions.herokuapp.com/api/";
//
// const API_URL = stripEndSlashes(API_URL_dev);
const API_URL = stripEndSlashes(API_URL_production);
////
export {
  useAppData,
  useArticles,
  useFlags,
  //
  ADMIN,
  API_URL,
  APP_NOTIFICATION,
  DISPAY_ARTICLE,
  FLAG_FEEDS_LOADING,
  FLAG_TEST,
  TEST
};
