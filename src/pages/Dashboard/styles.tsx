import styled from 'styled-components/native';

interface FeaturedSpacingProps {
  index: number;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f2f2f2;
`;

export const BarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f2f2f2;
  justify-content: space-between;
  padding: 16px;
`;

export const InfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AvatarImage = styled.Image`
  height: 60px;
  width: 60px;
  border-radius: 30px;
`;

export const GreetContainer = styled.View`
  justify-content: center;
  margin-left: 16px;
`;

export const GreetText = styled.Text`
  font-family: OpenSans-Bold;
  color: #1b1a24;
  font-size: 18px;
`;

export const UserNameText = styled.Text`
  font-family: OpenSans-Regular;
  color: #1b1a24;
  font-size: 16px;
`;

export const NewPlaylistButton = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  border-width: 3px;
  border-radius: 20px;
  border-color: #1b1a24;
  justify-content: center;
  align-items: center;
`;

export const AvatarButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;
