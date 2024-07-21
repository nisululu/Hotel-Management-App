import styled from "styled-components";

const StyledFormRow = styled.div`
  margin: 2rem 0;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Label = styled.label`
  min-width: 20rem;
`;

function FormRowVertical({ label, children }) {
  return (
    <StyledFormRow>
      <Div>
        <Label htmlFor="">{label}</Label>
        {children}
      </Div>
    </StyledFormRow>
  );
}
export default FormRowVertical;
