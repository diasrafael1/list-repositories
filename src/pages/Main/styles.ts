import styled from "styled-components";

export const Container = styled.div`
  max-width: 700px;
  background: #ffff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

export const Alert = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;

  span {
    color: red;
    font-weight: bolder;
  }
`;
