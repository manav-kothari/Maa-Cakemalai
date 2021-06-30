import styled from "styled-components";
import ImgBg from "../../images/contact.jpg";

export const ContactContainer = styled.div`
  /* width: 100vw; */
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)),
    url(${ImgBg});
  background-position: center;
  background-size: cover;
  min-height: 95vh;
  padding: 0.5rem calc((100vw - 1500px) / 2);
  /* background: #150f0f; */
  color: #fff;
`;
