import { useMutation } from "@tanstack/react-query";
import { userSignin } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignin() {
  const { mutate: signin, isLoading } = useMutation({
    mutationFn: userSignin,
    onSuccess: () => {
      toast.success("User successfully signin.");
    },
    onError: (error) => toast.error(error.message),
  });
  return { signin, isLoading };
}

export default useSignin;
