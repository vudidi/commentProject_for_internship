const monthsTitle = {
  "01": "января",
  "02": "февраля",
  "03": "марта",
  "04": "апреля",
  "05": "мая",
  "06": "июня",
  "07": "июля",
  "08": "августа",
  "09": "сентября",
  10: "октября",
  11: "ноября",
  12: "декабря",
};

const formatHours = () => {
  let hours = new Date().getHours();
  if (hours.toString().length < 2) {
    return +("0" + hours);
  } else {
    return hours;
  }
};

const formatMinutes = () => {
  let minutes = new Date().getMinutes();
  if (minutes.toString().length < 2) {
    return "0" + minutes;
  } else {
    return minutes;
  }
};

export function getDateAndTime(datePost, local) {
  const year = new Date().getFullYear();
  const day = new Date().getDate();
  const month = new Date().getMonth();
  const hours = formatHours();
  const minutes = formatMinutes();

  const yearPost = datePost.slice(0, 4);
  const monthPost = datePost.slice(5, 7);
  const dayPost = datePost.slice(8, 10);
  const hoursPost = datePost.slice(11, 13);
  const minutesPost = datePost.slice(14, 16);

  if (year === +yearPost && day === +dayPost && month + 1 === +monthPost) {
    return local
      ? `Сегодня ${hoursPost}:${minutesPost}`
      : `Сегодня ${hours}:${minutes}`;
  } else if (
    year === +yearPost &&
    day - 1 === +dayPost &&
    month + 1 === +monthPost
  ) {
    return local
      ? `Вчера ${hoursPost}:${minutesPost}`
      : `Вчера ${hours}:${minutes}`;
  } else {
    return local
      ? `${dayPost} ${monthsTitle[monthPost]} ${yearPost} ${hoursPost}:${minutesPost}`
      : `${dayPost} ${monthsTitle[monthPost]} ${yearPost} ${hours}:${minutes}`;
  }
}

export function getPostTimeForLocal() {
  const hours = formatHours();
  const minutes = formatMinutes();
  return ` ${hours}:${minutes}`;
}
