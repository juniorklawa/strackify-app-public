import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #f9fafe;
`;

export const HeaderContainer = styled.View`
  padding-horizontal: 4px;
  margin-top: 16px;
  height: 40px;
  width: 100%;
  justify-content: center;
`;

export const GoBackButton = styled.TouchableOpacity`
  padding-left: 16px;
`;

export const TermsText = styled.Text`
  font-size: 14px;
  font-family: OpenSans-Light;
  margin-left: 4px;
  color: #9e9e9e;
`;

export const Title = styled.Text`
  color: #1b1a24;
  font-family: OpenSans-Bold;
  font-size: 28px;
  margin-top: 16px;
`;

export const BackDropContainer = styled.ScrollView`
  padding: 20px;
  flex: 1;
  background-color: #f9fafe;
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

export const TermsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 48px;
  margin-top: -40px;
  margin-left: -4px;
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
  height: 250px;
  width: 100%;
`;
