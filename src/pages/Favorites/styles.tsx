import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f2f2f2;
`;

export const Title = styled.Text`
  font-size: 36px;
  color: #212121;
  padding-horizontal: 12px;
  padding-vertical: 16px;
  font-family: OpenSans-ExtraBold;
`;

export const CardContainer = styled.TouchableOpacity`
  width: 180px;
  height: 150px;
  background-color: #282828;
  border-radius: 5px;
  margin: 8px;
`;

export const EmptyListText = styled.Text`
  font-size: 12px;
  color: #1b1a24;
  font-family: OpenSans-Regular;
`;

export const GoBackButton = styled.TouchableOpacity`
  margin-left: 16px;
`;

export const CategoryImage = styled.Image`
  width: 100%;
  height: 80px;
  justify-content: flex-start;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

export const CategoryDescription = styled.Text`
  color: #aeaeae;
  font-size: 12px;
  font-family: OpenSans-Regular;
`;

export const CategoryTitle = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-family: OpenSans-Bold;
`;

export const TextContainer = styled.View`
  padding: 8px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
