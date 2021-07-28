import * as Element from "./element.js";
import * as Routes from "../controller/routes.js";
import * as Auth from "../controller/auth.js";
import * as Util from "./util.js";
import * as FirebaseController from "../controller/firebase_controller.js";
import { Well } from "../model/well.js";

export function addEventListeners() {
  Element.menuWell.addEventListener("click", async () => {
    history.pushState(null, null, Routes.routePath.WELL);
    well_page();
  });
}

export function TwoDlistener() {
  let element = document.getElementById("Well-2D");
  element.addEventListener("click", () => {
    // changing the box images
    let boxThreeMap = document.getElementById("map");
    boxThreeMap.style.display = "block";
    let buttons = document.getElementsByClassName("Well_Buttons");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.background = "#f1741a";
    }
    element.style.background = "rgb(32, 145, 4)";
    let boxOne = document.getElementById("Well-Img-BoxOne");
    boxOne.src = "../images/Well_2D_BoxOne.png";
  });
}

export function ThreeDlistener() {
  let element = document.getElementById("Well-3D");
  element.addEventListener("click", () => {
    let boxThreeMap = document.getElementById("map");
    boxThreeMap.style.display = "none";
    let buttons = document.getElementsByClassName("Well_Buttons");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.background = "#f1741a";
    }
    element.style.background = "rgb(32, 145, 4)";
    let boxOne = document.getElementById("Well-Img-BoxOne");
    boxOne.src = "../images/Well_3D_BoxOne.png";
    let boxThree = document.getElementById("Well-Img-BoxThree");
    boxThree.src = "../images/Well_3D_BoxThree.png";
  });
}

export function NewWelllistener() {
  let element = document.getElementById("Well-NewWell");
  element.addEventListener("click", async () => {
    let boxThreeMap = document.getElementById("map");
    boxThreeMap.style.display = "none";
    let buttons = document.getElementsByClassName("Well_Buttons");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.background = "#f1741a";
    }
    element.style.background = "rgb(32, 145, 4)";
    let boxOne = document.getElementById("Well-Img-BoxOne");
    boxOne.src = "../images/Well_AddWell_BoxOne.png";
    let boxThree = document.getElementById("Well-Img-BoxThree");
    boxThree.src = "../images/Well_AddWell_BoxThree.png";

    const long = 97.5164;
    const lat = 35.4676;
    const well = new Well({
      long,
      lat,
    });
    const locationId = await FirebaseController.addWell(well);
    console.log(locationId);
  });
}

export function EditWelllistener() {
  let element = document.getElementById("Well-EditWell");
  element.addEventListener("click", () => {
    let boxThreeMap = document.getElementById("map");
    boxThreeMap.style.display = "none";
    let buttons = document.getElementsByClassName("Well_Buttons");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.background = "#f1741a";
    }
    element.style.background = "rgb(32, 145, 4)";
    let boxOne = document.getElementById("Well-Img-BoxOne");
    boxOne.src = "../images/Well_3D_BoxOne.png";
    let boxThree = document.getElementById("Well-Img-BoxThree");
    boxThree.src = "../images/Well_EditWell_BoxThree.png";
  });
}

let map;
export async function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 51.513329,
      lng: -0.08895,
    },
    zoom: 14,
  });
  // let myscript = document.createElement("script");
  // myscript.setAttribute(
  //   "src",
  //   "https://maps.googleapis.com/maps/api/js?key=AIzaSyA207PAbvfKWK7vBqnA3XUHr6oAMmityUk&callback=initMap"
  // );
  // document.body.appendChild(myscript);
}

export async function well_page() {
  if (!Auth.currentUser) {
    Element.mainContent.innerHTML = "<h1>Protected Page</h>";
    return;
  }
  buildWellScreen();
  TwoDlistener();
  ThreeDlistener();
  NewWelllistener();
  EditWelllistener();
  initMap();
}

export function buildWellScreen() {
  let html = "";

  html += `
	<div id="login-nav">
	  <nav class="navbar navbar-expand-lg navbar-light">
	  <div class="collapse navbar-collapse" id="navbarNav">
		<ul class="navbar-nav nav-fill w-100">
		  <li class="nav-item">
			  <button class="nav-link Well_Buttons" id="Well-2D" ><i class="fas fa-map-marker-alt"></i> 2D Viewer</button>
		  </li>
		  <li class="nav-item">
			  <button class="nav-link Well_Buttons" id="Well-3D" ><i class="fas fa-cube"></i> 3D Viewer</button>
		  </li>
		  <li class="nav-item">
			  <button class="nav-link Well_Buttons" id="Well-NewWell" ><img src="../images/NewWell.png" height="22">  Add New Well</button>
		  </li>
		  <li class="nav-item">
			  <button class="nav-link Well_Buttons" id="Well-EditWell" ><i class="far fa-edit"></i> Well editing</button>
		  </li>
		  <li class="nav-item">
			  <button class="nav-link Well_Buttons" ><i class="fas fa-file-upload"></i> Input data</button>
		  </li>
		</ul>
	  </div>
	</nav>
  </div>
  
  <div class="container">
	<div class="box-one"><img id="Well-Img-BoxOne" src="../images/Well_2D_BoxOne.png" width="100%" height="100%"></div>
	<div class="box-two"><img id="Well-Img-BoxTwo" src="../images/Well_2D_BoxTwo.png" width="100%" height="100%"></div>
  <div class="box-three"><img id="Well-Img-BoxThree" src="../images/Well_2D_BoxThree.png" width="100%" height="100%"></div>
  <div id="map"></div>
  </div>
	  `;

  Element.mainContent.innerHTML = html;
  let navs = document.getElementsByClassName("main-nav");
  for (let i = 0; i < navs.length; i++) navs[i].style.background = "white";
  Element.menuWell.style.background = "#f1741a";
  let element = document.getElementById("Well-2D");
  element.style.background = "rgb(32, 145, 4)";
}

// Initialize and add the map
// function initMap() {
//   let myscript = document.createElement("script");
//   myscript.setAttribute(
//     "src",
//     "https://maps.googleapis.com/maps/api/js?key=AIzaSyA207PAbvfKWK7vBqnA3XUHr6oAMmityUk&callback=initMap"
//   );
//   document.body.appendChild(myscript);
//   // The location of Uluru
//   const uluru = { lat: -25.344, lng: 131.036 };
//   // The map, centered at Uluru
//   const map = new google.maps.Map(
//     document.getElementById("Well-Img-BoxThree"),
//     {
//       zoom: 4,
//       center: uluru,
//     }
//   );
//   // The marker, positioned at Uluru
//   const marker = new google.maps.Marker({
//     position: uluru,
//     map: map,
//   });
// }
