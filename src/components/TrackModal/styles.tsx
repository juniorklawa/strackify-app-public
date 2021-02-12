import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #212121;
`;

export const HeaderContainer = styled.View`
  padding-horizontal: 4px;
  margin-top: 16px;
  height: 40px;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const PlayingNowText = styled.Text`
  color: #e0e0e0;
  font-family: OpenSans-Regular;
  font-size: 16px;
  margin-top: 8px;
`;

export const HeaderSpacing = styled.View`
  width: 24px;
`;

export const GoBackButton = styled.TouchableOpacity`
  padding-left: 16px;
`;

export const TrackDuration = styled.Text`
  color: #757575;
  font-family: OpenSans-Regular;
  font-size: 16px;
`;

export const Title = styled.Text`
  color: #fff;
  font-family: OpenSans-Bold;
  font-size: 24px;
  margin-top: 28px;
`;

export const ArtistName = styled.Text`
  color: #757575;
  font-family: OpenSans-Regular;
  font-size: 16px;
  margin-top: 8px;
`;

export const BackDropContainer = styled.ScrollView`
  padding: 20px;
  flex: 1;
  background-color: #212121;
`;

export const Input = styled.TextInput`
  height: 50px;
  margin-top: 16px;
  border-radius: 8px;
  background-color: #e0e0e0;
  padding: 16px;
  font-family: OpenSans-Regular;
`;

export const SignInButton = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  margin-top: 32px;
  border-color: #43cfc3;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border-width: 2px;
`;

export const SignInText = styled.Text`
  color: #fff;
  font-family: OpenSans-SemiBold;
  font-size: 16px;
  color: #43cfc3;
`;

export const BottomInfoContainer = styled.View`
  flex-direction: row;
  margin-top: 24px;
  margin-bottom: 48px;
`;

export const QuestionText = styled.Text`
  font-family: OpenSans-Light;
  color: #1b1a24;
`;

export const QuestionActionText = styled.Text`
  color: #43cfc3;
  font-family: OpenSans-Bold;
  margin-left: 8px;
`;

export const ErrorText = styled.Text`
  font-size: 12px;
  font-family: OpenSans-Regular;
  color: #c62828;
  padding: 4px;
`;

export const CoverContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const HeaderImage = styled.Image`
  height: 350px;
  width: 100%;
  border-radius: 10px;
`;

export const DurationContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: -8px;
`;

export const ControlsContainer = styled.View`
  width: 95%;
  height: 80px;
  margin-top: 32px;
  align-self: center;
  border-radius: 35px;
  background-color: #181818;
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
`;
