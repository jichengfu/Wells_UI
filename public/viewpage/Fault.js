import * as Element from "./element.js";
import * as Routes from "../controller/routes.js";
import * as Auth from "../controller/auth.js";
import * as Util from "./util.js";

export function addEventListeners() {
  Element.menuFault.addEventListener("click", async () => {
    history.pushState(null, null, Routes.routePath.FAULT);
    await fault_page();
  });
}

export async function fault_page() {
  if (!Auth.currentUser) {
    Element.mainContent.innerHTML = "<h1>Protected Page</h>";
    return;
  }
  buildFaultScreen();
}

export function buildFaultScreen() {
  let html = "";

  html += `
	<div id="login-nav">
	  <nav class="navbar navbar-expand-lg navbar-light">
	  <div class="collapse navbar-collapse" id="navbarNav">
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
	<div class="box-one">
	</div>
	<div class="box-two"></div>
	<div class="box-three"></div>
  </div>
	  `;

  Element.mainContent.innerHTML = html;
  let navs = document.getElementsByClassName("main-nav");
  for (let i = 0; i < navs.length; i++) navs[i].style.background = "white";
  Element.menuFault.style.background = "#f1741a";
}
