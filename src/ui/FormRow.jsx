import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6rem;
`;

const Label = styled.label`
  min-width: 20rem;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ label, children, error }) {
  return (
    <StyledFormRow>
      <Label htmlFor="">{label}</Label>
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}
export default FormRow;
