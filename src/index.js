import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import "./styles/style.css";
import "./scripts/component/AppBar.js";
import "./scripts/component/FooterNav.js";
import "regenerator-runtime";
import Router from "./scripts/services/Router.js";
import ServiceWorkerLiga from "./scripts/services/ServiceWorkerLiga.js";

//patch bundle image
const importAll = require =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});
importAll(require.context("./images", false, /\.(png|jpe?g|svg)$/));

//validasi service worker
if (!('serviceWorker' in navigator)) {
  console.log("Service worker tidak didukung browser anda.");
} else {
  ServiceWorkerLiga.registerServiceWorker();
  ServiceWorkerLiga.requestPermission();
}

// even untuk listening ketika hash berubah:
window.addEventListener('hashchange', Router);

// even untuk listening ketika load:
window.addEventListener('load', Router);

// inisiasi sidenav
document.addEventListener('DOMContentLoaded', function() {
  M.Sidenav.init(document.querySelectorAll('.sidenav'));
});