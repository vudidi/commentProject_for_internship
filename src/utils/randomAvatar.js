import ava01 from "../styles/images/ava01.png";
import ava02 from "../styles/images/ava02.png";
import ava03 from "../styles/images/ava03.png";
import ava04 from "../styles/images/ava04.png";
import ava05 from "../styles/images/ava05.png";
import ava06 from "../styles/images/ava06.png";
import ava07 from "../styles/images/ava07.png";

function getRandomNum(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}
export function getRandomAva(imgSelector) {
  const num = getRandomNum(8, 1);
  switch (num) {
    case 1:
      imgSelector.src = ava01;
      break;
    case 2:
      imgSelector.src = ava02;
      break;
    case 3:
      imgSelector.src = ava03;
      break;
    case 4:
      imgSelector.src = ava04;
      break;
    case 5:
      imgSelector.src = ava05;
      break;
    case 6:
      imgSelector.src = ava06;
      break;
    case 7:
      imgSelector.src = ava07;
      break;
  }
}
