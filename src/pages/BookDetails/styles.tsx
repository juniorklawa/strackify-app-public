import styled from 'styled-components/native';

export const Description = styled.Text`
  font-size: 14px;
  color: #eeeeee;
  text-align: center;
  font-family: OpenSans-Regular;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  margin-top: 38px;
  background-color: #fff;
  padding: 24px;
`;

export const InformationContainer = styled.View`
  margin-left: 16px;
`;

export const BookTitle = styled.Text`
  font-size: 16px;
  color: #000;
  flex-wrap: wrap;
  width: 70%;
  font-family: OpenSans-Bold;
`;

export const BookAuthor = styled.Text`
  margin-top: 8px;
  font-size: 14px;
  color: #bdbdbd;
  font-family: OpenSans-Regular;
`;

export const BookCover = styled.Image`
  width: 130px;
  height: 180px;
  border-radius: 8px;
`;

export const BookPages = styled.Text`
  margin-top: 8px;
  font-size: 14px;
  color: #bdbdbd;
  font-family: OpenSans-Regular;
`;

export const RatingText = styled.Text`
  margin-top: 8px;
  font-size: 16px;
  color: #000;
  font-family: OpenSans-Regular;
`;

export const StarsContainer = styled.View`
  margin-left: -4px;
  align-items: flex-start;
`;

export const BookDescriptionContainer = styled.View`
  padding-horizontal: 24px;
`;

export const DescriptionTitle = styled.Text`
  margin-top: 16px;
  font-size: 16px;
  color: #9e9e9e;
  font-family: OpenSans-Bold;
`;

export const DescriptionContent = styled.Text`
  font-size: 16px;
  color: #212121;
  font-family: OpenSans-Regular;
  line-height: 30px;
`;
