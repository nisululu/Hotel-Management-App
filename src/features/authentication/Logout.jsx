import Button from "../../ui/Button";
import useLogout from "./useLogout";

function Logout() {
  const { logout, isLoading } = useLogout();
  function handleLogout() {
    logout();
  }

  return (
    <Button
      size="medium"
      variation="secondary"
      onClick={handleLogout}
      disabled={isLoading}
    >
      Logout
    </Button>
  );
}

export default Logout;
