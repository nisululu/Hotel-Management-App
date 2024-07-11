import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import { useState } from "react";

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>TEST</p>
      </Row>

      <Row>
        <CabinTable />

        <Button onClick={() => setShowForm(!showForm)}>Add new cabin</Button>

        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
