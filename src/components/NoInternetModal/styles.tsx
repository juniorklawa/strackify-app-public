import styled from 'styled-components/native';

export const ModalContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const ModalCenterContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const ModalView = styled.View`
  margin: 16px;
  min-height: 280px;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  padding: 35px;
`;

export const Title = styled.Text`
  font-family: OpenSans-Bold;
  font-size: 40px;
  color: #424242;
`;

export const Description = styled.Text`
  font-family: OpenSans-Regular;
  text-align: center;
`;
