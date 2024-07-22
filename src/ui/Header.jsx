import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import UserAvatar from "../features/authentication/UserAvatar";
import Button from "./Button";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

const Ul = styled.ul`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: end;
`;

const Header = () => {
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <Ul>
        <li>
          <UserAvatar />
        </li>
        <li>
          <ButtonIcon onClick={() => navigate("/account")}>
            <HiOutlineUser />
          </ButtonIcon>
        </li>
        <li>
          <Logout />
        </li>
      </Ul>
    </StyledHeader>
  );
};

export default Header;
