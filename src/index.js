import "./index.html";
import "./styles/css/styles.css";

document.getElementById("date").valueAsDate = new Date();

const likeBtns = document.querySelectorAll(".comment__like");

console.log(likeBtns);

function toggleLike(el) {
  el.classList.toggle("comment__like_active");
}

likeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    toggleLike(btn);
  });
});
