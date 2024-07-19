import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function useCheckin() {
  const queryClient = useQueryClient();
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: () =>
      updateBooking(bookingId, { status: "checked-in", isPaid: true }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in.`);
      queryClient.invalidateQueries({
        // queryKey: ["bookings"]
        active: true,
      });
      navigate("/");
    },
    onError: (error) => toast.error(error.message),
  });
  return { checkin, isCheckingIn };
}
