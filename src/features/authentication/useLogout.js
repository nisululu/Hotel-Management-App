import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userLogout } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      toast.success("User successfully logout.");
      navigate("/login", { replace: true });
      queryClient.removeQueries();
    },
    onError: (error) => toast.error(error.message),
  });

  return { logout, isLoading };
}

export default useLogout;
