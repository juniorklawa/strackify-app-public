import styled from 'styled-components/native';
import Shimmer from 'react-native-shimmer';

export const Container = styled.View`
  flex: 1;
`;

export const BookResultShimmer = styled(Shimmer)`
  margin-top: 8px;
`;

export const BookResultSkeleton = styled.View`
  width: 100%;
  height: 70px;
  border-radius: 5px;
  background-color: #bdbdbd;
`;
