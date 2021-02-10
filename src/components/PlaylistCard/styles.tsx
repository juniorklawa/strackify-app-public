import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

interface CardContainerProps {
  isFeatured?: boolean;
}

export const CardContainer = styled.TouchableOpacity<CardContainerProps>`
  width: ${({ isFeatured }) => (!isFeatured ? 'null' : '190px')};
  padding: 2px;
`;

export const CardContent = styled.View`
  align-items: flex-end;
`;

export const ContentContainer = styled(LinearGradient).attrs(() => ({
  colors: ['#12121299', '#12121299', '#12121299'],
  start: { x: 0, y: 1 },
  end: { x: 0, y: 0 },
}))`
  width: 100%;
  padding: 12px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const FavoriteButton = styled.TouchableOpacity`
  align-items: flex-end;
  padding: 4px;
`;

export const HeartContainer = styled.View`
  height: 40px;
  width: 40px;
  background-color: #00000010;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

export const CategoryImage = styled.ImageBackground.attrs(() => ({
  borderRadius: 8,
  resizeMode: 'cover',
}))`
  width: 100%;
  height: 150px;
  justify-content: space-between;
`;

export const CategoryDescription = styled.Text`
  color: #e0e0e0;
  font-size: 12px;
  font-family: OpenSans-Regular;
`;

export const CategoryTitle = styled.Text`
  color: #ffffff;
  font-size: 14px;
  font-family: OpenSans-Bold;
`;
