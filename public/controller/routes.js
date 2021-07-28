import * as Home from "../viewpage/Home.js";
import * as Well from "../viewpage/Well.js";
import * as Petro from "../viewpage/Petro.js";
import * as Seismic from "../viewpage/Seismic.js";
import * as Fault from "../viewpage/Fault.js";
import * as Production from "../viewpage/Production.js";

export const routePath = {
  HOME: "/",
  WELL: "/well",
  PETRO: "/petro",
  SEISMIC: "/seismic",
  FAULT: "/fault",
  PRODUCTION: "/production",
};

export const routes = [
  { path: routePath.HOME, page: Home.home_page },
  { path: routePath.WELL, page: Well.well_page },
  { path: routePath.PETRO, page: Petro.petro_page },
  { path: routePath.SEISMIC, page: Seismic.seismic_page },
  { path: routePath.FAULT, page: Fault.fault_page },
  { path: routePath.PRODUCTION, page: Production.production_page },
];

export function routing(pathname, href) {
  let uri;
  const route = routes.find((r) => r.path == pathname);
  if (route) route.page(uri);
  else routes[0].page();
}
