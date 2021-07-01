import styled from "styled-components";

export const CakeContainer = styled.div`
  /* width: 100vw; */
  min-height: 10vh;
  padding: 0.5rem calc((100vw - 1500px) / 2);
  background: #150f0f;
  color: #fff;
  padding-bottom: 40px;
  @media screen and (max-width: 960px) {
    padding-bottom: 40px;
  }
`;
