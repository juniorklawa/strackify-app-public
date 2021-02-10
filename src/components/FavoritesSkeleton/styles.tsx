import Shimmer from 'react-native-shimmer';
import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 8px;
`;

export const TitleShimmer = styled(Shimmer)`
  margin-top: 48px;
  width: 220px;
  height: 30px;
  margin-left: 12px;
`;

export const TitleSkeleton = styled.View`
  height: 80px;
  background-color: #bdbdbd;
`;

export const CategorySkeleton = styled.View`
  border-radius: 10px;
  height: 150px;
  width: 100%;
  background-color: #bdbdbd;
`;
