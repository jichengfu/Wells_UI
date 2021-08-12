import * as Element from "./element.js";
import * as Routes from "../controller/routes.js";
import * as Auth from "../controller/auth.js";
import * as Util from "./util.js";

export function addEventListeners() {
  Element.menuPetro.addEventListener("click", async () => {
    history.pushState(null, null, Routes.routePath.PETRO);
    petro_page();
  });
}

export function LogViewerlistener() {
  let element = document.getElementById("Petro_LogViewer");
  element.addEventListener("click", () => {
    let buttons = document.getElementsByClassName("Petro_Buttons");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.background = "#f1741a";
    }
    element.style.background = "rgb(32, 145, 4)";
    // let boxOne = document.getElementById("Petro-Img-BoxOne");
    // boxOne.src = "../images/Petro_LogViewer_BoxOne.png";
    let boxTwo = document.getElementById("Petro-Img-BoxTwo");
    boxTwo.src = "../images/Petro_LogViewer_BoxTwo.png";
    let boxThree = document.getElementById("Petro-Img-BoxThree");
    boxThree.src = "../images/Petro_LogViewer_BoxThree.png";
  });
}

export function WellCorrlistener() {
  let element = document.getElementById("Petro_WellCorr");
  element.addEventListener("click", () => {
    let buttons = document.getElementsByClassName("Petro_Buttons");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.background = "#f1741a";
    }
    element.style.background = "rgb(32, 145, 4)";
    // let boxOne = document.getElementById("Petro-Img-BoxOne");
    // boxOne.src = "../images/Petro_WellCorr_BoxOne.png";
    let boxTwo = document.getElementById("Petro-Img-BoxTwo");
    boxTwo.src = "../images/Petro_WellCorr_BoxTwo.png";
    let boxThree = document.getElementById("Petro-Img-BoxThree");
    boxThree.src = "../images/Petro_WellCorr_BoxThree.png";
  });
}

export function CrossSectionlistener() {
  let element = document.getElementById("Petro_CrossSection");
  element.addEventListener("click", () => {
    let buttons = document.getElementsByClassName("Petro_Buttons");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.background = "#f1741a";
    }
    element.style.background = "rgb(32, 145, 4)";
    // let boxOne = document.getElementById("Petro-Img-BoxOne");
    // boxOne.src = "../images/Petro_CrossSection_BoxOne.png";
    let boxTwo = document.getElementById("Petro-Img-BoxTwo");
    boxTwo.src = "../images/Petro_CrossSection_BoxTwo.png";
    let boxThree = document.getElementById("Petro-Img-BoxThree");
    boxThree.src = "../images/Petro_CrossSection_BoxThree.png";
  });
}

export function PropertyLoglistener() {
  let element = document.getElementById("Petro_PropertyLog");
  element.addEventListener("click", () => {
    let buttons = document.getElementsByClassName("Petro_Buttons");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.background = "#f1741a";
    }
    element.style.background = "rgb(32, 145, 4)";
    // let boxOne = document.getElementById("Petro-Img-BoxOne");
    // boxOne.src = "../images/Petro_PropertyLog_BoxOne.png";
    let boxTwo = document.getElementById("Petro-Img-BoxTwo");
    boxTwo.src = "../images/Petro_PropertyLog_BoxTwo.png";
    let boxThree = document.getElementById("Petro-Img-BoxThree");
    boxThree.src = "../images/Petro_PropertyLog_BoxThree.png";
  });
}

export async function petro_page() {
  if (!Auth.currentUser) {
    Element.mainContent.innerHTML = "<h1>Protected Page</h>";
    return;
  }
  buildPetroScreen();
  LogViewerlistener();
  WellCorrlistener();
  CrossSectionlistener();
  PropertyLoglistener();
}

export function buildPetroScreen() {
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
              <button class="nav-link Petro_Buttons" id="Petro_LogViewer"><img src="../images/LogViewer.png" height="22"> Log Viewer</button>
            </li>
            <li class="nav-item">
              <button class="nav-link Petro_Buttons" id="Petro_WellCorr"><img src="../images/WellCorrelation.png" height="22"> Well correlation</button>
            </li>
            <li class="nav-item">
              <button class="nav-link Petro_Buttons" id="Petro_CrossSection"><img src="../images/CrossSection.png" height="22">  Cross Section</button>
            </li>
            <li class="nav-item">
              <button class="nav-link Petro_Buttons" id="Petro_PropertyLog"><i class="far fa-edit"></i> Property log</button>
            </li>
            <li class="nav-item">
              <button class="nav-link Petro_Buttons" id="Petro_InputData"><i class="fas fa-file-upload"></i> Input data</button>
            </li>
            <li class="nav-item">
              <button class="nav-link Petro_Buttons" id="Petro_AIModel"><img src="../images/AIModel.png" height="22"> AI Model</button>
            </li>
        </ul>   
      </div>
    </nav>
  </div>
  
  <div class="container">
    <div class="box-one">
      <ul id="tree" style="list-style-type:none;">
        <li>
          <button class="well-tree-button" id="GroupOneButton">
            <i class="fas fa-folder" style="color: tan"></i> 
            Group 1
          </button>
          <ul id="GroupOne" style="list-style-type:none;">

          </ul>
        </li>
        <li>
          <button class="well-tree-button" id="GroupTwoButton">
          <img src="../images/LogViewer.png" height="18"> 
            Log Type
          </button>
          <ul id="GroupTwo" style="list-style-type:none;">

          </ul>
        </li>
      </ul>
    </div>
  <div class="box-two"><img id="Petro-Img-BoxTwo" src="../images/Petro_LogViewer_BoxTwo.png" width="100%" height="100%"></div>
  <div class="box-three"><img id="Petro-Img-BoxThree" src="../images/Petro_LogViewer_BoxThree.png" width="100%" height="625px"></div>
  </div>
	  `;

  Element.mainContent.innerHTML = html;
  let navs = document.getElementsByClassName("main-nav");
  for (let i = 0; i < navs.length; i++) navs[i].style.background = "white";
  Element.menuPetro.style.background = "#f1741a";
  let element = document.getElementById("Petro_LogViewer");
  element.style.background = "rgb(32, 145, 4)";
}
