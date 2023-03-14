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

  const localCommentsArr = JSON.parse(localStorage.getItem("localComments"));
  const commentKey = evt.target.closest(".comment").dataset.id;

  localCommentsArr.forEach((el) => {
    if (el.key === commentKey) {
      el.isLiked = !el.isLiked;
    }
  });

  localStorage.setItem("localComments", JSON.stringify(localCommentsArr));
}

// Удалить комментарий
function deleteComment(btn) {
  const commentKey = btn.closest(".comment").dataset.id;
  btn.closest(".comment").remove();

  const localCommentsArr = JSON.parse(localStorage.getItem("localComments"));
  const localCommentsArrUpdated = [];

  localCommentsArr.forEach((el) => {
    if (el.key !== commentKey) {
      localCommentsArrUpdated.push(el);
    }
  });

  localStorage.setItem(
    "localComments",
    JSON.stringify(localCommentsArrUpdated)
  );

  if (localCommentsArrUpdated.length === 0) {
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

const localComments = [];
function submitComment(e) {
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

  const localComment = {
    key: currentComment.dataset.id,
    date: dateInput.value + getPostTimeForLocal(),
    name: nameInput.value,
    message: messageInput.value,
    isLiked: false,
  };
  localComments.push(localComment);

  localStorage.setItem("localComments", JSON.stringify(localComments));

  greetingBlock.classList.remove("greeting_visible");
  formButton.setAttribute("disabled", true);

  commentForm.reset();
  formButton.blur();
  getDate(dateInput);
}

commentForm.addEventListener("submit", submitComment);

// Отрисовать комментарии из локального хранилища при перезагрузке страницы
function renderLocalComments() {
  const localCommentsArr = JSON.parse(localStorage.getItem("localComments"));

  if (!localCommentsArr || localCommentsArr.length === 0) {
    greetingBlock.classList.add("greeting_visible");
    commentID = 0;
  } else if (localCommentsArr) {
    localCommentsArr.forEach((el) => {
      commentID = el.key;
      localComments.push(el);
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
}

window.onload = function () {
  renderLocalComments();
  formButton.setAttribute("disabled", true);
};
