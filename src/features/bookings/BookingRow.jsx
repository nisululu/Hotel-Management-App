import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import {
  HiOutlineArrowRightEndOnRectangle,
  HiOutlineArrowRightStartOnRectangle,
  HiOutlineEye,
  HiOutlineTrash,
} from "react-icons/hi2";
import useDeleteBooking from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.5rem;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate();

  const { checkout, isCheckingOut } = useCheckout();
  const { mutate: deleteBooking, isLoading: isDeletingBooking } =
    useDeleteBooking();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <StyledDiv>
        {status === "unconfirmed" && (
          <Button
            size="small"
            variation="secondary"
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            <HiOutlineArrowRightEndOnRectangle style={{ fontSize: "2rem" }} />
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            size="small"
            variation="secondary"
            onClick={() => checkout(bookingId)}
            disabled={isCheckingOut}
          >
            <HiOutlineArrowRightStartOnRectangle style={{ fontSize: "2rem" }} />
          </Button>
        )}

        <Button
          size="small"
          variation="primary"
          onClick={() => navigate(`/bookings/${bookingId}`)}
        >
          <HiOutlineEye style={{ fontSize: "2rem" }} />
        </Button>

        <Modal>
          <Modal.Open opens="delete">
            <Button size="small" variation="danger">
              <HiOutlineTrash style={{ fontSize: "2rem" }} />
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={name}
              disabled={isDeletingBooking}
              onConfirm={() => deleteBooking(bookingId)}
            />
          </Modal.Window>
        </Modal>
      </StyledDiv>
    </Table.Row>
  );
}

export default BookingRow;
