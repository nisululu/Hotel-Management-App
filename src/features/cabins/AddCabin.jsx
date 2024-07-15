import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import { MdThumbUpOffAlt } from "react-icons/md";
import CabinTable from "./CabinTable";

// function AddCabin() {
//   const [isOpenModal, setOpenModal] = useState(false);

//   return (
//     <>
//       <Button onClick={() => setOpenModal(!isOpenModal)}>Add new cabin</Button>

//       {isOpenModal && (
//         <Modal onCloseModal={() => setOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setOpenModal(false)} />
//         </Modal>
//       )}
//     </>
//   );
// }

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      {/* <Modal.Open opens="table">
        <Button>Show Table</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window> */}
    </Modal>
  );
}

export default AddCabin;
