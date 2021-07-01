import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { Button } from "../../../globalStyles";
import { FaShoppingCart } from "react-icons/fa";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  // NavIcon,
  MobileIcon,
  NavMenu,
  NavItem,
  NavItemBtn,
  NavLinks,
  NavBtnLink,
  CartIcon,
} from "./Navbar.elements";
import { isAuthenticated } from "../../../auth/helper";

function Navbar({ history }) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavbarContainer>
            <NavLogo to="/" onClick={closeMobileMenu}>
              {/* <NavIcon /> */}
              MAA CAKEMALAI
            </NavLogo>
            <MobileIcon onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </MobileIcon>
            <NavMenu onClick={handleClick} click={click}>
              <NavItem>
                <NavLinks to="/" onClick={closeMobileMenu}>
                  Home
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="/shop" onClick={closeMobileMenu}>
                  Shop
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="/contact" onClick={closeMobileMenu}>
                  Contact
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="/cart" onClick={closeMobileMenu}>
                  Cart
                  <FaShoppingCart />
                </NavLinks>
              </NavItem>
              {!isAuthenticated() && (
                <NavItemBtn>
                  {button ? (
                    <NavBtnLink to="/signin">
                      <Button>SIGN IN</Button>
                    </NavBtnLink>
                  ) : (
                    <NavBtnLink to="/signin">
                      <Button onClick={closeMobileMenu} fontBig>
                        SIGN IN
                      </Button>
                    </NavBtnLink>
                  )}
                </NavItemBtn>
              )}
              {isAuthenticated() && (
                <NavItemBtn>
                  {button ? (
                    <NavBtnLink to="/myprofile">
                      <Button style={{ backgroundColor: "#bc1823" }}>
                        My Profile
                      </Button>
                    </NavBtnLink>
                  ) : (
                    <NavBtnLink to="/myprofile">
                      <Button
                        style={{ backgroundColor: "#bc1823" }}
                        // onClick={closeMobileMenu}

                        fontBig
                      >
                        My Profile
                      </Button>
                    </NavBtnLink>
                  )}
                </NavItemBtn>
              )}
            </NavMenu>{" "}
            <CartIcon to="/cart">
              <FaShoppingCart />
            </CartIcon>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
