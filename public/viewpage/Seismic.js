import * as Element from "./element.js";
import * as Routes from "../controller/routes.js";
import * as Auth from "../controller/auth.js";
import * as Util from "./util.js";

export function addEventListeners() {
  Element.menuSeismic.addEventListener("click", async () => {
    history.pushState(null, null, Routes.routePath.SEISMIC);
    seismic_page();
  });
}

export async function seismic_page() {
  if (!Auth.currentUser) {
    Element.mainContent.innerHTML = "<h1>Protected Page</h>";
    return;
  }
  buildSeismicScreen();
}

export function buildSeismicScreen() {
  let html = "";

  html += `
	<div id="login-nav">
	  <nav class="navbar navbar-expand-lg navbar-light">
		<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#loginNavbarNav" aria-controls="loginNavbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
		</button>	
		<div class="collapse navbar-collapse" id="loginNavbarNav">
			<ul class="navbar-nav nav-fill w-100">
				<li class="nav-item">
					<button class="nav-link" ><img src="../images/LogViewer.png" height="22"> Log Viewer</button>
				</li>
				<li class="nav-item">
					<button class="nav-link" ><img src="../images/WellCorrelation.png" height="22"> Well correlation</button>
				</li>
				<li class="nav-item">
					<button class="nav-link" ><img src="../images/CrossSection.png" height="22">  Cross Section</button>
				</li>
				<li class="nav-item">
					<button class="nav-link" ><i class="far fa-edit"></i> Property log</button>
				</li>
				<li class="nav-item">
					<button class="nav-link" ><i class="fas fa-file-upload"></i> Input data</button>
				</li>
				<li class="nav-item">
					<button class="nav-link" ><img src="../images/AIModel.png" height="22"> AI Model</button>
				</li>
			</ul>
		</div>
	  </nav>
	</div>
  
  <div class="container">
	<div class="box-one"></div>
	<div class="box-two"></div>
	<div class="box-three"></div>
  </div>
	  `;

  Element.mainContent.innerHTML = html;
  let navs = document.getElementsByClassName("main-nav");
  for (let i = 0; i < navs.length; i++) navs[i].style.background = "white";
  Element.menuSeismic.style.background = "#f1741a";
}
