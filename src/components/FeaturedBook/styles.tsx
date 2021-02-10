import styled from 'styled-components/native';

export const BookButton = styled.TouchableOpacity`
  width: 120px;
  margin-horizontal: 12px;
`;

export const BookCover = styled.Image`
  width: 120px;
  height: 180px;
  border-radius: 8px;
`;

export const BookTitle = styled.Text`
  color: #1b1a24;
  margin-top: 8px;
  font-family: OpenSans-Bold;
  font-size: 13px;
  flex-wrap: wrap;
`;

export const BookAuthor = styled.Text`
  color: #9e9e9e;
  font-family: OpenSans-Regular;
`;
