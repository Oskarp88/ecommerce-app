import styled from "styled-components";

export const Header = styled.header`
  background: #121212;
  color: white;
  padding: 12px 20px;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Brand = styled.h1`
  color: #FFA500;
  font-size: 22px;
`;

export const DesktopMenu = styled.div`
  display: flex;
  gap: 18px;

  @media (max-width: 768px) {
    display: none;
  }
`;


interface NavLinkProps {
    href: string;
  }

export const NavLink = styled.a<NavLinkProps>`
  color: white;
  text-decoration: none;

  &:hover {
    color: #FFA500;
  }
`;


export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: #1f1f1f;
  border-radius: 5px;
  padding: 5px 10px;
  gap: 8px;
  margin-left: 20px;

  @media (max-width: 768px) {
    display: none;
  }

  input {
    background: transparent;
    border: none;
    outline: none;
    color: white;
  }
`;

export const SearchInput = styled.input`
  color: white;
`;

export const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const IconWrapper = styled.div`
  position: relative;
  cursor: pointer;

  p {
    margin: 5px 0;
    cursor: pointer;
  }
`;

export const LanguageDropdown = styled.div`
  position: absolute;
  top: 28px;
  right: 0;
  background: #222;
  padding: 10px;
  border-radius: 5px;
  z-index: 10;
`;

export const CartWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

export const CartCount = styled.span`
  position: absolute;
  top: -5px;
  right: -8px;
  background: #FFA500;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 11px;
`;

export const MenuIcon = styled.div`
  cursor: pointer;
  font-size: 22px;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #1e1e1e;
  padding: 15px 0;
  text-align: center;

  a {
    color: white;
    text-decoration: none;
    font-size: 16px;

    &:hover {
      color: #FFA500;
    }
  }

  @media (min-width: 769px) {
    display: none;
  }
`;
