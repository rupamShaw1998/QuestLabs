import styled from 'styled-components';

const Container = styled.div`
  background-color: white;
  position: absolute;
  z-index: 5;
  width: 90%;
  top: 20%;
  left: 50%;
  bottom: -18%;
  transform: translateX(-50%);
  border-radius: 5% 5% 0 0;
`;

const IMG = styled.img`
  width: 27%;
  margin-top: -14%;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export { Container, IMG };
