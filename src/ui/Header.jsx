import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import UserAvatar from "../features/authentication/UserAvatar";
import { Link } from "react-router-dom";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

const Ul = styled.ul`
  display: flex;
  gap: 3rem;
  align-items: center;
  justify-content: end;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Ul>
        <li>
          <Link to="/account">
            <UserAvatar />
          </Link>
        </li>
        <li>
          <Logout />
        </li>
      </Ul>
    </StyledHeader>
  );
};

export default Header;
