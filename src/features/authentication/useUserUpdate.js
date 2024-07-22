import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useUserUpdate() {
  const queryClient = useQueryClient();

  const { mutate: userUpdate, isLoading } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("User successfully updated.");
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => toast.error(error.message),
  });
  return { userUpdate, isLoading };
}

export default useUserUpdate;
