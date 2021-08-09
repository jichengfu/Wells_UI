import * as Element from "./element.js";
import * as Routes from "../controller/routes.js";
import * as Auth from "../controller/auth.js";
import * as Util from "./util.js";

export function addEventListeners() {
  Element.menuHome.addEventListener("click", async () => {
    history.pushState(null, null, Routes.routePath.HOME);
    const label = Util.disableButton(Element.menuHome);
    await home_page();
    Util.enableButton(Element.menuHome, label);
  });
}

export async function home_page() {
  //   console.log(currentUser);
  // if (!Auth.currentUser) {
  //   Element.mainContent.innerHTML = "<h1>Protected Page</h>";
  //   return;
  // }
  let mainContent = document.getElementById("main-content");
  mainContent.style.visibility = "hidden";
  buildHomeScreen();
  mainContent.style.visibility = "visible";
}

export function buildHomeScreen() {
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
            <button class="nav-link" ><i class="far fa-folder"></i> New project</button>
          </li>
          <li class="nav-item">
            <button class="nav-link" ><i class="far fa-folder-open"></i> Open project</button>
          </li>
          <li class="nav-item">
            <button class="nav-link" ><i class="far fa-save"></i> Save project</button>
          </li>
          <li class="nav-item">
            <button class="nav-link" ><i class="far fa-save"></i> Save project as</button>
          </li>
          <li class="nav-item">
            <button class="nav-link" ><i class="fas fa-file-upload"></i> Input data</button>
          </li>
        </ul>
      </div>
    </nav>
  </div>

<div class="container">
  <div class="box-one">
    <ul style="list-style-type:none;">
      <li><button class="home-button"><i class="fas fa-folder"></i>  Well</button></li>
      <li><button class="home-button"><i class="fas fa-folder"></i>  Surface</button></li>
      <li><button class="home-button"><i class="fas fa-folder"></i>  Polygon</button></li>
      <li><button class="home-button"><i class="fas fa-folder"></i>  Fault</button></li>
      <li><button class="home-button"><i class="fas fa-folder"></i>  Production</button></li>
    </ul>
  </div>
  <div class="box-two"></div>
  <div class="box-three"><img src="../images/Home_TextPad.png" width="100%" height="625px"></div>
</div>

	`;

  Element.mainContent.innerHTML = html;
  let navs = document.getElementsByClassName("main-nav");
  for (let i = 0; i < navs.length; i++) navs[i].style.background = "white";
  Element.menuHome.style.background = "#f1741a";
}
