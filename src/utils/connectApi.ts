const prodFlag: boolean =
  window.location.hostname.indexOf("local") >= 0 ? false : true;
const prodUrl = "https://";
const devUrl = "http://";
let baseUrl;
if (prodFlag) {
  baseUrl = prodUrl + window.location.hostname;
} else {
  baseUrl = devUrl + window.location.hostname + ":8083";
}
export const BASE_URL = baseUrl;
