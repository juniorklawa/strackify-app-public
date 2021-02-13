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

export const EmptyListText = styled.Text`
  font-size: 12px;
  color: #1b1a24;
  font-family: OpenSans-Regular;
`;

export const LoadMoreContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`;

export const LoadMoreButtonText = styled.Text`
  font-family: OpenSans-Regular;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  background-color: #f9fafe;
  border-color: #43cfc3;
  border-width: 1.5px;
  align-items: center;
  padding-horizontal: 8px;
  margin-horizontal: 12px;
  border-radius: 8px;
`;

export const Input = styled.TextInput`
  height: 40px;
  flex: 1;
`;

export const LoadingContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
