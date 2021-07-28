// lesson_1

import * as Element from "../viewpage/element.js";
import * as FirebaseController from "./firebase_controller.js";
import * as Util from "../viewpage/util.js";
import * as Routes from "./routes.js";

export let currentUser;

export function addEventListeners() {
  Element.formSignin.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = Element.formSignin.email.value;
    const password = Element.formSignin.password.value;

    const button = Element.formSignin.getElementsByTagName("button")[0];
    const originalLabel = Util.disableButton(button);

    try {
      await FirebaseController.signIn(email, password);
      // dismiss sign in modal
    } catch (e) {
      Util.popupInfo("Sign in Error", JSON.stringify(e));
    }
    Util.enableButton(button, originalLabel);
  });

  Element.menuSignout.addEventListener("click", async () => {
    try {
      await FirebaseController.signOut();
    } catch (e) {
      Util.popupInfo("Sign out error", JSON.stringify(e));
    }
  });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUser = user;
      let element = document.getElementById("pre-auth");
      element.style.display = "none";

      element = document.getElementById("post-auth");
      element.style.display = "block";

      element = document.getElementById("main-content");
      element.style.display = "block";

      // routing : for page reloading
      const pathname = window.location.pathname;
      const href = window.location.href;
      Routes.routing(pathname, href);
    } else {
      currentUser = null;

      let element = document.getElementById("pre-auth");
      element.style.display = "block";

      element = document.getElementById("post-auth");
      element.style.display = "none";

      element = document.getElementById("main-content");
      element.style.display = "none";

      history.pushState(null, null, Routes.routePath.HOME);
    }
  });

  Element.formSignUp.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordConfirm = e.target.passwordConfirm.value;

    // reset error message
    const errorTags = document.getElementsByClassName("error-signup");
    for (let i = 0; i < errorTags.length; i++) {
      errorTags[i].innerHTML = "";
    }

    let valid = true; // input validation
    // email e.g., only @uco.edu
    if (password.length < 6) {
      document.getElementById("signup-error-password").innerHTML =
        "password must be at least 6 characters long";
      valid = false;
    }
    if (passwordConfirm != password) {
      document.getElementById("signup-error-passwordConfirm").innerHTML =
        "confirm password does not match";
      valid = false;
    }

    if (!valid) return;

    try {
      await FirebaseController.signUp(email, password);
      Util.popupInfo(
        "Account Created",
        "You are signed in now!",
        "modal-create-new-account"
      );
    } catch (e) {
      Util.popupInfo(
        "Failed to Create an Account",
        JSON.stringify(e),
        "modal-create-new-account"
      );
    }
  });
}
// lesson_1
