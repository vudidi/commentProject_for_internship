export function handleEventEnter(evt) {
  if (evt.key === "Enter") {
    evt.preventDefault();
    evt.target.nextElementSibling.focus();
    if (evt.target.nextElementSibling.nodeName === "SPAN") {
      evt.target.nextElementSibling.nextElementSibling.focus();
    }
  }
}
