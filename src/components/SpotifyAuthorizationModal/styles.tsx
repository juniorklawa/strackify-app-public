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

export const GoBackButton = styled.TouchableOpacity`
  padding-left: 16px;
`;

export const Title = styled.Text`
  color: #fff;
  font-family: OpenSans-Bold;
  font-size: 24px;
  align-self: center;
  margin-top: 28px;
`;

export const BackDropContainer = styled.ScrollView`
  padding: 20px;
  flex: 1;
  background-color: #212121;
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

export const AuthExplanation = styled.Text`
  font-family: OpenSans-Regular;
  font-size: 14px;
  color: #fff;
  margin-top: 8px;
`;

export const GoodReadingText = styled.Text`
  font-family: OpenSans-Bold;
  font-size: 14px;
  color: #fff;
  margin-top: 8px;
`;

export const UnderstandButton = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  margin-top: 16px;
  background-color: #43cfc3;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

export const UnderstandButtonText = styled.Text`
  font-family: OpenSans-Bold;
  font-size: 18px;
  color: #fff;
`;
