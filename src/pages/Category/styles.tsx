import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 32px;
  color: #ffffff;
  margin-left: 10px;
  font-family: OpenSans-Bold;
`;

export const LoadMoreContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`;

export const LoadMoreButtonText = styled.Text`
  font-family: OpenSans-Regular;
`;

export const CardContainer = styled.TouchableOpacity`
  width: 180px;
  min-height: 150px;
  background-color: #282828;
  border-radius: 2px;
  margin: 8px;
`;

export const BarContainer = styled.View`
  padding: 16px;
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

export const RecommendedTitle = styled.Text`
  margin-top: 4px;
  color: #bdbdbd;
  font-size: 12px;
  font-family: OpenSans-SemiBold;
`;

export const GoBackButton = styled.TouchableOpacity`
  margin-left: 16px;
`;

export const EmptyListContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyListText = styled.Text`
  font-family: OpenSans-Regular;
  color: #424242;
`;

export const CategoryTitle = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-family: OpenSans-Bold;
`;

export const TextContainer = styled.View`
  padding: 8px;
`;

export const BackButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
`;

export const BackButton = styled.TouchableOpacity`
  padding: 8px;
`;

export const RecommendedContainer = styled.View`
  padding-horizontal: 8px;
`;
export const ModalContainer = styled.View`
  min-height: 350px;
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ModalTitle = styled.Text`
  font-family: OpenSans-Bold;
  color: #ffffff;
  font-size: 24px;
`;

export const ModalDescription = styled.Text`
  font-family: 'OpenSans-Bold';
  color: #ffffff;
  font-size: 12px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
