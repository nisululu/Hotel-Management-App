import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  gap: 10rem;
`;

const Label = styled.label`
  min-width: 20rem;
`;

function FormRow({ label, children }) {
  return (
    <StyledFormRow>
      <Label htmlFor="">{label}</Label>
      {children}
    </StyledFormRow>
  );
}
export default FormRow;
