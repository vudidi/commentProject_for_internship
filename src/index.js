import "./index.html";
import "./styles/css/styles.css";
import "./utils/validation.js";
import { getRandomAva } from "./utils/randomAvatar.js";
import {
  getDate,
  getDateAndTime,
  getPostTimeForLocal,
} from "./utils/getDate.js";
import { handleEventEnter } from "./utils/eventHandler.js";
import {
  formInputs,
  dateInput,
  nameInput,
  messageInput,
  formButton,
  commentForm,
  commentList,
  greetingBlock,
} from "./utils/constants.js";

// Переход по инпутам и отправка формы по нажатию Enter
formInputs.forEach((el) => {
  el.addEventListener("keypress", handleEventEnter);
});

// Вывести текущую дату в календарь
getDate(dateInput);

// Лайк комментария
function toggleLike(evt) {
  evt.target.classList.toggle("comment__like_active");

  const commentKey = evt.target.closest(".comment").dataset.id;
  const item = JSON.parse(localStorage.getItem(commentKey));
  item.isLiked = !item.isLiked;
  localStorage.setItem(commentKey, JSON.stringify(item));
}

// Удалить комментарий
function deleteComment(btn) {
  const commentKey = btn.closest(".comment").dataset.id;
  localStorage.removeItem(commentKey);
  btn.closest(".comment").remove();

  if (localStorage.length === 0) {
    greetingBlock.classList.add("greeting_visible");
    commentID = 0;
  }
}

// Создать карточку из шаблона
const commentTemplate = document.querySelector("#tmpl-comments").content;
let commentID = 0;

function cloneCommentTemplate(item, local, localId, isLiked) {
  const commentElement = commentTemplate.cloneNode(true);
  const commentItem = commentElement.querySelector(".comment");

  if (!local) {
    commentID++;
    commentItem.dataset.id = commentID;
  } else {
    commentItem.dataset.id = localId;
  }

  const commentImage = commentElement.querySelector(".comment__avatar");
  getRandomAva(commentImage);

  commentElement.querySelector(".comment__date").textContent = item.date;
  commentElement.querySelector(".comment__name").textContent = item.name;
  commentElement.querySelector(".comment__message").textContent = item.message;

  const likeCommentButton = commentElement.querySelector(".comment__like");
  const deleteCommentButton = commentElement.querySelector(".comment__delete");

  likeCommentButton.addEventListener("click", toggleLike);
  deleteCommentButton.addEventListener("click", () => {
    deleteComment(deleteCommentButton);
  });

  if (isLiked) {
    likeCommentButton.classList.add("comment__like_active");
  } else {
    likeCommentButton.classList.remove("comment__like_active");
  }

  return commentElement;
}

function createComment(item, local, localId, isLiked) {
  const newComment = cloneCommentTemplate(item, local, localId, isLiked);
  commentList.prepend(newComment);
  return newComment;
}

// Опубликовать комментарий
commentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  createComment(
    {
      date: getDateAndTime(dateInput.value),
      name: nameInput.value,
      message: messageInput.value,
    },
    false
  );

  const currentComment = commentList.firstElementChild;

  localStorage.setItem(
    currentComment.dataset.id,
    JSON.stringify({
      key: currentComment.dataset.id,
      date: dateInput.value + getPostTimeForLocal(),
      name: nameInput.value,
      message: messageInput.value,
      isLiked: false,
    })
  );

  greetingBlock.classList.remove("greeting_visible");
  formButton.setAttribute("disabled", true);

  commentForm.reset();
  formButton.blur();
  getDate(dateInput);
});

// Получить массив комментариев из локального хранилища
function getLocalComments() {
  const arrLocal = [];

  Object.keys(localStorage).forEach(function (key) {
    arrLocal.push(JSON.parse(localStorage.getItem(key)));
  });

  if (arrLocal.length === 0) {
    greetingBlock.classList.add("greeting_visible");
    commentID = 0;
  }
  const sortedLocalArr = arrLocal.sort(function (a, b) {
    return a.key - b.key;
  });

  return sortedLocalArr;
}

// Отрисовать комментарии из локального хранилища при перезагрузке страницы
function renderLocalComments() {
  const listItems = getLocalComments();
  console.log(listItems);
  listItems.forEach((el) => {
    commentID = el.key;
    createComment(
      {
        date: getDateAndTime(el.date, true),
        name: el.name,
        message: el.message,
      },
      true,
      el.key,
      el.isLiked
    );
  });
}

window.onload = function () {
  renderLocalComments();

  formButton.setAttribute("disabled", true);
};
