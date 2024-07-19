import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

function useBookingDetail() {
  const { bookingId } = useParams();

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getBooking(bookingId),
    queryKey: ["bookings", bookingId],
  });

  return { booking, isLoading, error };
}

export default useBookingDetail;
