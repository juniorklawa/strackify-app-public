import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f2f2f2;
  padding-horizontal: 16px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #1b1a24;
  font-family: OpenSans-Bold;
`;

export const Header = styled.View`
  flex-direction: row;
  width: 100%;
  padding-vertical: 16px;
  align-items: center;
`;

export const LoadingContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  height: 300px;
`;

export const HeaderInfoContainer = styled.View`
  margin-left: 16px;
`;

export const UserName = styled.Text`
  font-size: 22px;
  color: #212121;
  font-family: OpenSans-ExtraBold;
`;

export const UserEmail = styled.Text`
  font-size: 16px;
  color: #757575;
  margin-left: 4px;
  font-family: OpenSans-Regular;
`;

export const UserEmailContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AvatarPicture = styled.Image`
  height: 90px;
  width: 90px;
  border-radius: 45px;
`;

export const MyPlaylistsContainer = styled.View`
  margin-top: 32px;
`;

export const SignOutButtonContainer = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  margin-top: 16px;
  margin-bottom: 16px;
  background-color: #43cfc3;
  justify-content: center;
  align-items: center;
`;

export const DeleteAccountButton = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  margin-top: 16px;
  border-color: #b71c1c;
  border-width: 2px;
  justify-content: center;
  align-items: center;
`;

export const DeleteAccountText = styled.Text`
  font-family: OpenSans-Bold;
  color: #b71c1c;
  font-size: 20px;
  padding-horizontal: 8px;
  margin-left: 8px;
`;

export const SignOutText = styled.Text`
  font-family: OpenSans-Bold;
  color: #fff;
  font-size: 20px;
  padding-horizontal: 8px;
  margin-left: 8px;
`;
