export function getHashParams() {
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

export function generateRandomString(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function getRandomYear() {
  return Math.floor(Math.random() * (CURRENT_YEAR - 1920) + 1920);
}

export function getRandomOffset() {
  return Math.floor(Math.random() * 20);
}

export function login() {
  let client_id = "8ecffb9d750f40bdbee34807494346fb";
  let redirect_id = `${window.location.href}`;

  let state = generateRandomString(16);

  localStorage.setItem(STATE_KEY, state);

  let scope = "user-read-private user-read-email";

  let url = "https://accounts.spotify.com/authorize";
  url += "?response_type=token";
  url += "&client_id=" + encodeURIComponent(client_id);
  url += "&scope=" + encodeURIComponent(scope);
  url += "&redirect_uri=" + encodeURIComponent(redirect_id);
  url += "&state=" + encodeURIComponent(state);

  window.location = url;
}

export const CURRENT_YEAR = new Date().getFullYear();

export const STATE_KEY = "spotify_auth_state";
