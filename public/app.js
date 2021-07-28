import * as Auth from "./controller/auth.js";
import * as Home from "./viewpage/Home.js";
import * as Routes from "./controller/routes.js";
import * as Well from "./viewpage/Well.js";
import * as Petro from "./viewpage/Petro.js";
import * as Seismic from "./viewpage/Seismic.js";
import * as Fault from "./viewpage/Fault.js";
import * as Production from "./viewpage/Production.js";

Auth.addEventListeners();
Home.addEventListeners();
Well.addEventListeners();
Petro.addEventListeners();
Seismic.addEventListeners();
Fault.addEventListeners();
Production.addEventListeners();

window.onload = () => {
  const pathname = window.location.pathname;
  const href = window.location.href;

  //   if (pathname == "/") Home.home_page();
  //   else if (pathname == "/about") About.about_page();
  Routes.routing(pathname, href);
};

window.addEventListener("popstate", (e) => {
  e.preventDefault();
  const pathname = e.target.location.pathname;
  const href = e.target.location.href;
  Routes.routing(pathname, href);
});
