import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBookingDetail from "../bookings/useBookingDetail";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckin";
import { getSettings } from "../../services/apiSettings";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { booking, isLoading, error } = useBookingDetail();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings, isSetting } = useSettings();

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [breakfast, setBreakfast] = useState(false);

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
    setBreakfast(booking?.hasBreakfast ?? false);
  }, [booking]);

  if (isLoading || isSetting) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const priceAfterBreakfast = settings?.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (breakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extraPrice: priceAfterBreakfast,
          totalPrice: totalPrice + priceAfterBreakfast,
        },
      });
    } else checkin({ bookingId, breakfast: {} });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Box>
        <Checkbox
          id="breakfast"
          checked={breakfast}
          disabled={breakfast}
          onChange={() => {
            setBreakfast((breakfast) => !breakfast);
            setConfirmPaid(false);
          }}
        >
          Add breakfast.
        </Checkbox>
      </Box>
      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
          id="confirm"
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!breakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + priceAfterBreakfast
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                priceAfterBreakfast
              )})`}
          .
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
