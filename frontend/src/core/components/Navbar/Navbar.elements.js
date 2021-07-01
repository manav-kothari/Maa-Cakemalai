import styled from "styled-components";
import { FaMagento } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Container } from "../../../globalStyles";

export const Nav = styled.nav`
  background: #000;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: sticky;
  top: 0;
  z-index: 999;
  /* @media screen and (max-width: 960px) {
    background: #000;
  } */
`;

export const NavbarContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  height: 65px;

  ${Container}
`;

export const NavLogo = styled(Link)`
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  text-decoration: none !important;
  font-size: 2rem;
  display: flex;
  align-items: center;

  transition: all 1s;
  @media screen and (max-width: 960px) {
    margin-right: auto;
    margin-left: auto;
    font-size: 1.6rem;
  }
  @media screen and (max-width: 360px) {
    margin-right: auto;
    margin-left: auto;
    font-size: 1.4rem;
  }
  &:hover {
    text-shadow: 0 0 3px #fff, 0 0 5px #fff, 0 0 8px #ffc42e;
  }
`;

export const NavIcon = styled(FaMagento)`
  margin-right: 0.5rem;
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 960px) {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(50%, 20%);
    font-size: 1.8rem;
    cursor: pointer;
  }
  @media screen and (max-width: 360px) {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(50%, 27%);
    font-size: 1.6rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;

  @media screen and (max-width: 960px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 95vh;
    position: absolute;
    top: 65px;
    left: ${({ click }) => (click ? 0 : "-100%")};
    opacity: 1;
    transition: all 0.5s ease;
    backdrop-filter: blur(70px) saturate(50%) contrast(10%);
  }
`;

export const NavItem = styled.div`
  height: 65px;
  border-bottom: 2px solid transparent;

  &:hover {
    border-bottom: 2px solid #bc1823;
  }

  @media screen and (max-width: 960px) {
    width: 100%;
    height: 100px;
    &:hover {
      border: none;
    }
  }
`;

export const NavItemBtn = styled.div`
  @media screen and (max-width: 960px) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 60px;
    width: 100%;
    height: 10px;
  }
`;

export const NavLinks = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  height: 100%;
  font-weight: 800;

  @media screen and (max-width: 960px) {
    text-align: center;
    padding: 2rem;
    width: 100%;
    display: table;
    font-size: 2rem;

    &:hover {
      text-decoration: none;
      transition: all 0.3s ease;
    }
  }
`;

export const NavBtnLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 8px 16px;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
`;

export const CartIcon = styled(Link)`
  display: none;

  @media screen and (max-width: 960px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-50%, 20%);
    font-size: 1.8rem;
    cursor: pointer;
  }
  @media screen and (max-width: 360px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-50%, 30%);
    font-size: 1.6rem;
    cursor: pointer;
  }
`;
