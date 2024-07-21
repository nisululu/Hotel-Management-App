import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const { mutate: userLogin, isLoading: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (data) => {
      toast.success(`User successfully logged in.`);
      navigate("/");
    },
    onError: (error) => toast.error(error.message),
  });
  return { userLogin, isLoggingIn };
}

export default useLogin;
