import { Link } from "react-router-dom";
import UserAvatar from "../features/authentication/UserAvatar";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import Logout from "../features/authentication/Logout";
import { useDarkMode } from "../context/DarkModeContext";

function HeaderItems() {
  const { isDark, toogleDarkMode } = useDarkMode();

  return (
    <>
      <li>
        <Link to="/account">
          <UserAvatar />
        </Link>
      </li>
      <li>
        <ButtonIcon onClick={toogleDarkMode}>
          {isDark ? <HiOutlineSun /> : <HiOutlineMoon />}
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </>
  );
}

export default HeaderItems;
