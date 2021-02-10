import styled from 'styled-components/native';

export const ItemContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding-vertical: 80px;
  background-color: #22bcb5;
`;

export const ItemTitle = styled.Text`
  font-family: OpenSans-ExtraBold;
  text-align: center;
  font-size: 22px;
  color: #fff;
`;

export const ItemImage = styled.Image`
  width: 60%;
  height: 500px;
`;

export const ItemDescription = styled.Text`
  text-align: center;
  color: #fff;
  font-family: OpenSans-Regular;
  width: 80%;
  font-size: 16px;
`;
