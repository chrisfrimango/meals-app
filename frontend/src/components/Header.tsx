import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  height: 100px;
`;

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <HeaderContainer>{children}</HeaderContainer>;
};

export default Header;
