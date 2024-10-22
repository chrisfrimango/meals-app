// import "./App.css";
import Recepies from "./components/Recepies";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  /* width: 100%; */
  padding: 0 1rem;
`;

function App() {
  return (
    <Container>
      <Recepies />
    </Container>
  );
}

export default App;
