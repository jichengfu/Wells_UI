import * as Element from "./element.js";

export function popupInfo(title, body, modal) {
  if (modal) {
    console.log(modal);
    var hideModal = bootstrap.Modal.getInstance(document.getElementById(modal));
    hideModal.hide();
  }

  var myModal = new bootstrap.Modal(
    document.getElementById("modal-popup-info"),
    {}
  );

  Element.popUpInfoTitle.innerHTML = title;
  Element.popUpInfoBody.innerHTML = body;
  myModal.show();
}

export function disableButton(button) {
  button.disabled = true;
  const originalLabel = button.innerHTML;
  button.innerHTML = "Wait...";
  return originalLabel;
}

export function enableButton(button, originalLabel) {
  if (originalLabel) button.innerHTML = originalLabel;
  button.disabled = false;
}
