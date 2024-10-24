import { Outlet, Link as NavLink } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #3d1716;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: #3d1716;
`;

function App() {
  return (
    <Container>
      <Header>
        <Link to="/">
          <Title>Recipe</Title>
        </Link>
        <Nav>
          <Link to="/">Recipes</Link>
          <Link to="/favorites">Favorites</Link>
        </Nav>
      </Header>
      <Outlet />
    </Container>
  );
}

export default App;
