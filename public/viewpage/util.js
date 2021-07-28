import * as Element from "./element.js";

export function popupInfo(title, body, modal) {
  if (modal) {
    $("#" + modal).modal("hide");
  }

  Element.popUpInfoTitle.innerHTML = title;
  Element.popUpInfoBody.innerHTML = body;
  $("#modal-popup-info").modal("show");
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
