import "./App.css";
import Recepies from "./components/Recepies";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vh;
  padding: 2rem;
`;

function App() {
  return (
    <Container>
      <Recepies />
    </Container>
  );
}

export default App;
