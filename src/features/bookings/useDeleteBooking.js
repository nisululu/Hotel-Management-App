import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success(`Booking deleted successfully.`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => toast.error(error.message),
  });
  return { mutate, isLoading };
}

export default useDeleteBooking;
