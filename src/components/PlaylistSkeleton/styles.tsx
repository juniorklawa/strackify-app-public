import styled from 'styled-components/native';
import Shimmer from 'react-native-shimmer';

export const Container = styled.View`
  margin-top: 8px;
`;

export const TrackContainer = styled.View`
  flex-direction: row;
`;

export const CoverShimmer = styled(Shimmer)`
  margin-top: 10px;
  width: 60px;
  height: 60px;
  margin-left: 6px;
`;

export const CoverSkeleton = styled.View`
  height: 80px;
  border-radius: 5px;
  background-color: #bdbdbd;
`;

export const TitleShimmer = styled(Shimmer)`
  margin-top: 16px;
  width: 150px;
  height: 10px;
  margin-left: 12px;
`;

export const TitleSkeleton = styled.View`
  height: 80px;
  background-color: #bdbdbd;
`;

export const DescriptionShimmer = styled(Shimmer)`
  margin-top: 4px;
  width: 80px;
  height: 10px;
  margin-left: 12px;
`;

export const DescriptionSkeleton = styled.View`
  height: 80px;
  background-color: #bdbdbd;
`;

export const TextContainer = styled.View``;
