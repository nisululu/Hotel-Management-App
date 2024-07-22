import Button from "../../ui/Button";
import useLogout from "./useLogout";

function Logout() {
  const { logout, isLoading } = useLogout();
  function handleLogout() {
    logout();
  }

  return (
    <Button
      size="small"
      variation="danger"
      onClick={handleLogout}
      disabled={isLoading}
    >
      Logout
    </Button>
  );
}

export default Logout;
