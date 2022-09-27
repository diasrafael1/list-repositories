import styled from "styled-components";

export const Container = styled.div`
  max-width: 700px;
  background: #ffff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;
  position: relative;

  h1 {
    font-size: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

export const Alert = styled.div`
  position: absolute;
  top: 135px;
  left: 220px;

  span {
    color: red;
    font-weight: bolder;
  }
`;
