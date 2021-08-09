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
    // show the map
    let boxThreeMap = document.getElementById("map");
    boxThreeMap.style.display = "block";

    // re-initialize map
    initMap();

    // style the navbar buttons
    let buttons = document.getElementsByClassName("Well_Buttons");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.background = "#f1741a";
    }
    element.style.background = "rgb(32, 145, 4)";
  });
}

export function ThreeDlistener() {
  let element = document.getElementById("Well-3D");
  element.addEventListener("click", () => {
    // remove the map
    let boxThreeMap = document.getElementById("map");
    boxThreeMap.style.display = "none";

    // style the navbar buttons
    let buttons = document.getElementsByClassName("Well_Buttons");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.background = "#f1741a";
    }
    element.style.background = "rgb(32, 145, 4)";

    // Change Box three to 3D view
    let html = "";
    html += `
      <img id="Well-Img-BoxThree" src="../images/Well_3D_BoxThree.png" width="100%" height="623px">
    `;
    let addMenu = document.getElementById("AddWellMenu");
    addMenu.innerHTML = html;
  });
}

export function NewWelllistener() {
  let element = document.getElementById("Well-NewWell");
  element.addEventListener("click", async () => {
    // Remove map
    let boxThreeMap = document.getElementById("map");
    boxThreeMap.style.display = "none";

    // style navbar buttons
    let buttons = document.getElementsByClassName("Well_Buttons");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.background = "#f1741a";
    }
    element.style.background = "rgb(32, 145, 4)";

    // Change Box three to add well view
    let html = "";
    html += `
      <h4><span id="NewWellLabel">Create New Well</span></h4>
      <div>
        <form id="Add-Well-Form" method="post">
          <div id="Well_Name">
            Well Name <input type="text" name="wellName"/>
            <p id="well-name-error" class="error-well"></p>
          </div>
          <div class="Add_Well_Container">
            <div id="Head">
              Well Head
            </div>
            <div id="Co_X">
              <div class="Add_Well_Spacing">Coordinate X </div>
              <p id="well-x-error-label" class="error-well"></p>
              <div>Well Type </div>
              <p id="well-type-error-label" class="error-well"></p>
            </div>
            <div id="Input_X">
              <input class="Add_Well_Spacing" type="number" step="any" name="Co_X"/>
              <p id="well-x-error" class="error-well"></p>
              <input type="text" name="wellType"/>
              <p id="well-type-error" class="error-well"></p>
            </div>
            <div id="Co_Y">
              <div class="Add_Well_Spacing">Coordinate Y </div>
              <p id="well-y-error-label" class="error-well"></p>
              <div>Spud Date </div> 
            <p id="well-spud-error-label" class="error-well"></p>
            </div>
            <div id="Input_Y">
              <input class="Add_Well_Spacing" type="number" step="any" name="Co_Y"/>
              <p id="well-y-error" class="error-well"></p>
              <input type="date" name="spud"/>
              <p id="well-spud-error" class="error-well"></p>
            </div>
          </div>
          <div style="padding-left: 20px; padding-bottom: 20px">Well Deviation</div>
            <table class="table table-striped table-primary" id="New_Well_Table" >
              <thead>
                <tr>
                  <th scope="col">X</th>
                  <th scope="col">Y</th>
                  <th scope="col">Z</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">100</td>
                  <td>100</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td scope="row">...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table> 
          <div id="Add_Well_Button_Container">
            <button class="Add_Well_Buttons" id="Button_One" type="submit">Add</button>
            <button class="Add_Well_Buttons" id="Button_Two" type="reset">Cancel</button>
          </div>
        </form>
      </div>
    `;

    let addMenu = document.getElementById("AddWellMenu");
    addMenu.innerHTML = html;

    // add listeners to buttons
    AddWellButtonListener();
    CancelWellButtonListener();
  });
}

// Listener for Add Well button
export function AddWellButtonListener() {
  let element = document.getElementById("Add-Well-Form");
  element.addEventListener("submit", async (e) => {
    e.preventDefault();
    let buttonOne = document.getElementById("Button_One");
    const label = Util.disableButton(buttonOne);
    const name = e.target.wellName.value;
    const lat = e.target.Co_Y.value;
    const long = e.target.Co_X.value;
    const type = e.target.wellType.value;
    const spud = e.target.spud.value;
    const showing = true;
    const group = "Group 1";

    // reset error message
    const errorTags = document.getElementsByClassName("error-well");
    for (let i = 0; i < errorTags.length; i++) {
      errorTags[i].innerHTML = "";
    }

    // validate all the inputs
    let valid = true;

    // see if there are any wells with that name
    let wells = [];
    try {
      wells = await FirebaseController.getEditWell(name);
    } catch (e) {
      console.log(e);
    }

    if (name.length < 1 || wells.length > 0) {
      document.getElementById("well-name-error").innerHTML =
        "Name must be unique and at least 1 character long";
      valid = false;
    }

    if (long < -180.0 || long > 180.0) {
      document.getElementById("well-x-error").innerHTML =
        "X coordinate must be between -90 and 90 degrees";
      document.getElementById("well-x-error-label").innerHTML = "Error: ";
      valid = false;
    }

    if (lat < -90.0 || lat > 90.0) {
      document.getElementById("well-y-error").innerHTML =
        "Y coordinate must be between -90 and 90 degrees";
      document.getElementById("well-y-error-label").innerHTML = "Error: ";
      valid = false;
    }

    if (type.length < 1) {
      document.getElementById("well-type-error").innerHTML =
        "Type must be at least 1 character long";
      document.getElementById("well-type-error-label").innerHTML = "Error: ";
      valid = false;
    }

    if (spud.length < 1) {
      document.getElementById("well-spud-error").innerHTML =
        "Spud Date must be at least 1 character long";
      document.getElementById("well-spud-error-label").innerHTML = "Error: ";
      valid = false;
    }

    // return if an input is invalid
    if (!valid) {
      Util.enableButton(buttonOne, label);
      return;
    }

    // try to add the well
    try {
      const well = new Well({
        name,
        long,
        lat,
        type,
        spud,
        showing,
        group,
      });
      const docId = await FirebaseController.addWell(well);
      well.docId = docId;
      Util.popupInfo("Success", "A new well has been added");
    } catch (e) {
      Util.popupInfo("Failed to add", JSON.stringify(e));
    }

    // reset the inputs
    let blank = "";
    e.target.wellName.value = blank;
    e.target.Co_X.value = blank;
    e.target.Co_Y.value = blank;
    e.target.wellType.value = blank;
    e.target.spud.value = blank;
    Util.enableButton(buttonOne, label);

    // update Box one
    buildBoxGroupOne();
    buildBoxGroupTwo();
  });
}

// Listener for Cancel Add Well button
export function CancelWellButtonListener() {
  let element = document.getElementById("Add-Well-Form");
  element.addEventListener("reset", () => {
    // reset error message
    const errorTags = document.getElementsByClassName("error-well");
    for (let i = 0; i < errorTags.length; i++) {
      errorTags[i].innerHTML = "";
    }
  });
}

export function EditWelllistener() {
  let element = document.getElementById("Well-EditWell");
  element.addEventListener("click", () => {
    // Remove map
    let boxThreeMap = document.getElementById("map");
    boxThreeMap.style.display = "none";

    // style navbar buttons
    let buttons = document.getElementsByClassName("Well_Buttons");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.background = "#f1741a";
    }
    element.style.background = "rgb(32, 145, 4)";

    // Change Box three to edit well view
    let html = "";
    html += `
      <h4><span id="NewWellLabel">Edit Selected Well</span></h4>
      <div>
        <form id="Edit-Well-Form" method="post">
          <div id="Well_Name">
            Well Name
            <select id="Well-Name-Options" name="wellName">
              
            </select>
            <p id="well-name-error" class="error-well"></p>
          </div>
          <div class="Add_Well_Container">
            <div id="Head">
              Well Head
            </div>
            <div id="Co_X">
              <div class="Add_Well_Spacing">Coordinate X </div> 
              <p id="well-x-error-label" class="error-well"></p>
              <div class="Add_Well_Spacing">Well Type </div> 
              <p id="well-type-error-label" class="error-well"></p>
            </div>
            <div id="Input_X">
              <input class="Add_Well_Spacing" type="number" step="any" name="Co_X"/>
              <p id="well-x-error" class="error-well"></p>
              <input class="Add_Well_Spacing" type="text" name="wellType"/>
              <p id="well-type-error" class="error-well"></p>
            </div>
            <div id="Co_Y">
              <div class="Add_Well_Spacing">Coordinate Y </div>
              <p id="well-y-error-label" class="error-well"></p>
              <div class="Add_Well_Spacing">Spud Date </div> 
              <p id="well-spud-error-label" class="error-well"></p>
            </div>
            <div id="Input_Y">
              <input class="Add_Well_Spacing" type="number" step="any" name="Co_Y"/>
              <p id="well-y-error" class="error-well"></p>
              <input class="Add_Well_Spacing" type="date" name="spud"/>
              <p id="well-spud-error" class="error-well"></p>
            </div>
          </div>
          <div style="padding-left: 20px; padding-bottom: 20px">Well Deviation</div>
            <table class="table table-striped table-primary" id="New_Well_Table" >
              <thead>
                <tr>
                  <th scope="col">X</th>
                  <th scope="col">Y</th>
                  <th scope="col">Z</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">100</td>
                  <td>100</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td scope="row">...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table> 
          <div id="Add_Well_Button_Container">
            <button class="Add_Well_Buttons" id="Button_One" type="submit">Submit</button>
            <button class="Add_Well_Buttons" id="Button_Two" type="reset">Cancel</button>
          </div>
        </form>
      </div>
    `;

    let addMenu = document.getElementById("AddWellMenu");
    addMenu.innerHTML = html;
    EditWellButtonListener();
    CancelEditWellButtonListener();
    buildWellNameOptions();
  });
}

// Listener for Edit Well button
export function EditWellButtonListener() {
  let element = document.getElementById("Edit-Well-Form");
  element.addEventListener("submit", async (e) => {
    e.preventDefault();
    let buttonOne = document.getElementById("Button_One");
    const label = Util.disableButton(buttonOne);

    const wellName = e.target.wellName.value;
    const lat = e.target.Co_Y.value;
    const long = e.target.Co_X.value;
    const type = e.target.wellType.value;
    const spud = e.target.spud.value;

    // reset error message
    const errorTags = document.getElementsByClassName("error-well");
    for (let i = 0; i < errorTags.length; i++) {
      errorTags[i].innerHTML = "";
    }

    // validate all the inputs
    let valid = true;

    if (wellName.length < 1) {
      document.getElementById("well-name-error").innerHTML =
        "Name must be at least 1 character long";
      valid = false;
    }

    if (long < -180.0 || long > 180.0) {
      document.getElementById("well-x-error").innerHTML =
        "X coordinate must be between -90 and 90 degrees";
      document.getElementById("well-x-error-label").innerHTML = "Error: ";
      valid = false;
    }

    if (lat < -90.0 || lat > 90.0) {
      document.getElementById("well-y-error").innerHTML =
        "Y coordinate must be between -90 and 90 degrees";
      document.getElementById("well-y-error-label").innerHTML = "Error: ";
      valid = false;
    }

    if (type.length < 1) {
      document.getElementById("well-type-error").innerHTML =
        "Type must be at least 1 character long";
      document.getElementById("well-type-error-label").innerHTML = "Error: ";
      valid = false;
    }

    if (spud.length < 1) {
      document.getElementById("well-spud-error").innerHTML =
        "Spud Date must be at least 1 character long";
      document.getElementById("well-spud-error-label").innerHTML = "Error: ";
      valid = false;
    }

    // return if an input is invalid
    if (!valid) {
      Util.enableButton(buttonOne, label);
      return;
    }

    let wells = [];
    try {
      wells = await FirebaseController.getEditWell(wellName);
    } catch (e) {
      console.log(e);
      Util.popupInfo("Well Selection Error", JSON.stringify(e));
    }
    if (wells.length < 1) {
      Util.popupInfo("Well Selection Erro", "No wells by that name!");
      let blank = "";
      e.target.wellName.value = blank;
      e.target.Co_X.value = blank;
      e.target.Co_Y.value = blank;
      e.target.wellType.value = blank;
      e.target.spud.value = blank;
      Util.enableButton(buttonOne, label);
    } else {
      const showing = wells[0].showing;
      const group = wells[0].group;
      const well = {
        name: wellName,
        long: long,
        lat: lat,
        type: type,
        spud: spud,
        showing: showing,
        group: group,
      };

      try {
        await FirebaseController.updateWell(wells[0].docId, well);
        Util.popupInfo("Success", "Well has been updated!");
      } catch (e) {
        console.log(e);
        Util.popupInfo("Well Update Error", JSON.stringify(e));
      }
      let blank = "";
      e.target.wellName.value = blank;
      e.target.Co_X.value = blank;
      e.target.Co_Y.value = blank;
      e.target.wellType.value = blank;
      e.target.spud.value = blank;
      Util.enableButton(buttonOne, label);
    }
  });
}

// Listener for Cancel Edit Well button
export function CancelEditWellButtonListener() {
  let element = document.getElementById("Edit-Well-Form");
  element.addEventListener("reset", () => {
    // reset error message
    const errorTags = document.getElementsByClassName("error-well");
    for (let i = 0; i < errorTags.length; i++) {
      errorTags[i].innerHTML = "";
    }
  });
}

export async function buildWellNameOptions() {
  let element = document.getElementById("Well-Name-Option");
  let wells = [];
  try {
    wells = await FirebaseController.getAllWells();
  } catch (e) {
    console.log(e);
    Util.popupInfo;
  }
  let optionsMenu = document.getElementById("Well-Name-Options");
  let html = `<option value="">--Please choose an option--</option>`;
  for (let i = 0; i < wells.length; i++) {
    let wellName = wells[i].name;
    html += `
      <option value="${wellName}">-${wellName}</option>
    `;
  }
  optionsMenu.innerHTML = html;
}

let map;
export async function initMap() {
  let wells = [];
  try {
    wells = await FirebaseController.getShowingWells();
  } catch (e) {
    console.log(e);
    Util.popupInfo("Showing Wells Error", JSON.stringify(e));
  }

  if (wells.length > 0) {
    let lat = parseFloat(wells[0].lat);
    let long = parseFloat(wells[0].long);

    const wellOne = { lat: lat, lng: long };
    map = new google.maps.Map(document.getElementById("map"), {
      center: wellOne,
      zoom: 10,
    });

    for (let i = 0; i < wells.length; i++) {
      let lat = parseFloat(wells[i].lat);
      let long = parseFloat(wells[i].long);
      const well = { lat: lat, lng: long };
      const marker = new google.maps.Marker({
        position: well,
        map: map,
        label: wells[i].name,
        animation: google.maps.Animation.DROP,
      });
    }
  } else {
    const okc = { lat: 35.4676, lng: -97.5164 };
    map = new google.maps.Map(document.getElementById("map"), {
      center: okc,
      zoom: 10,
    });
  }
}

export async function buildBoxGroupOne() {
  let wellsGroupOne = [];

  try {
    wellsGroupOne = await FirebaseController.getWellsByGroup("Group 1");
  } catch (e) {
    console.log(e);
    Util.popupInfo("Box One building error", "Could not get wells by group!");
  }

  // fill Group 1
  let htmlOne = "";
  for (let i = 0; i < wellsGroupOne.length; i++) {
    let wellName = wellsGroupOne[i].name;
    let wellShowing = wellsGroupOne[i].showing;
    if (wellShowing == true) {
      htmlOne += `
        <li style="font-size: 10px">
          <label class="form-check-label" for="well">${wellName}</label>
          <input type="checkbox" class="form-check-input" id="${wellName}" checked>
        </li>
      `;
    } else {
      htmlOne += `
        <li style="font-size: 10px">
          <label class="form-check-label" for="well">${wellName}</label>
          <input type="checkbox" class="form-check-input" id="${wellName}">
        </li>
      `;
    }
  }
  let groupOne = document.getElementById("GroupOne");
  groupOne.innerHTML = htmlOne;

  // add listeners to inputs
  for (let i = 0; i < wellsGroupOne.length; i++)
    addCheckBoxListeners(wellsGroupOne[i].docId, wellsGroupOne[i].name);
}

export async function buildBoxGroupTwo() {
  let wellsGroupTwo = [];

  try {
    wellsGroupTwo = await FirebaseController.getWellsByGroup("Group 2");
  } catch (e) {
    console.log(e);
    Util.popupInfo("Box One building error", "Could not get wells by group!");
  }

  // fill Group 2
  let htmlTwo = "";
  for (let i = 0; i < wellsGroupTwo.length; i++) {
    let wellName = wellsGroupTwo[i].name;
    let wellShowing = wellsGroupTwo[i].showing;
    if (wellShowing == true) {
      htmlTwo += `
        <li style="font-size: 10px">
          <label class="form-check-label" for="well">${wellName}</label>
          <input type="checkbox" class="form-check-input" id="${wellName}" checked>
        </li>
      `;
    } else {
      htmlTwo += `
        <li style="font-size: 10px">
          <label class="form-check-label" for="well">${wellName}</label>
          <input type="checkbox" class="form-check-input" id="${wellName}">
        </li>
      `;
    }
  }
  let groupTwo = document.getElementById("GroupTwo");
  groupTwo.innerHTML = htmlTwo;

  // add listeners to inputs
  for (let i = 0; i < wellsGroupTwo.length; i++)
    addCheckBoxListeners(wellsGroupTwo[i].docId, wellsGroupTwo[i].name);
}

export async function addGroupButtonListeners() {
  // build for group one
  let clickedOne = true;
  let elementOne = document.getElementById("GroupOneButton");
  elementOne.addEventListener("click", async () => {
    if (clickedOne == true) {
      await buildBoxGroupOne();
      elementOne.innerHTML = `
        <i class="fas fa-folder-open" style="color: tan"></i> 
        Group 1
      `;
      clickedOne = false;
    } else {
      elementOne.innerHTML = `
        <i class="fas fa-folder" style="color: tan"></i> 
        Group 1
      `;
      let groupOne = document.getElementById("GroupOne");
      groupOne.innerHTML = "";
      clickedOne = true;
    }
  });

  // build for group two
  let clickedTwo = true;
  let elementTwo = document.getElementById("GroupTwoButton");
  elementTwo.addEventListener("click", async () => {
    console.log(clickedTwo);
    await buildBoxGroupTwo();
    if (clickedTwo == true) {
      elementTwo.innerHTML = `
        <i class="fas fa-folder-open" style="color: tan"></i>
        Group 2
      `;
      clickedTwo = false;
    } else {
      elementTwo.innerHTML = `
        <i class="fas fa-folder" style="color: tan"></i>
        Group 2
      `;
      clickedTwo = true;
    }
  });
}

// checkbox listeners
export async function addCheckBoxListeners(wellId, wellName) {
  let element = document.getElementById(wellName);
  element.addEventListener("change", async () => {
    if (element.checked) {
      // console.log(wellId);
      const showing = true;
      const updateWell = {
        showing: showing,
      };
      try {
        await FirebaseController.updateWell(wellId, updateWell);
      } catch (e) {
        console.log(e);
        Util.popupInfo(
          "Update Error",
          "Could not update well showing attribute!"
        );
      }
      initMap();
    } else {
      const showing = false;
      const updateWell = {
        showing: showing,
      };
      try {
        await FirebaseController.updateWell(wellId, updateWell);
      } catch (e) {
        console.log(e);
        Util.popupInfo(
          "Update Error",
          "Could not update well showing attribute!"
        );
      }
      initMap();
    }
  });
}

export function buildWellScreen() {
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
            <i class="fas fa-folder" style="color: tan"></i> 
            Group 2
          </button>
          <ul id="GroupTwo" style="list-style-type:none;">

          </ul>
        </li>
      </ul>
    </div>
    <div class="box-two"><img id="Well-Img-BoxTwo" src="../images/Well_2D_BoxTwo.png" width="100%" height="100%"></div>
    <div class="box-three" id="AddWellMenu"></div>
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
  // buildBoxOne();
  addGroupButtonListeners();
  initMap();
}
