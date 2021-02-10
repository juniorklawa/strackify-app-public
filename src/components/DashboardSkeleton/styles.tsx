import styled from 'styled-components/native';
import Shimmer from 'react-native-shimmer';

export const Container = styled.View`
  margin: 16px;
`;

export const ProfileRow = styled.View`
  flex-direction: row;
`;

export const BookSkeletonShimmer = styled(Shimmer)`
  margin-top: 8px;
  width: 80px;
  height: 80px;
  margin-left: 6px;
`;

export const AvatarSkeleton = styled.View`
  height: 80px;
  border-radius: 40px;
  background-color: #bdbdbd;
`;

export const GreetinSkeletonShimmer = styled(Shimmer)`
  margin-top: 16px;
  width: 180px;
  height: 15px;
  margin-left: 12px;
`;

export const GreetinSkeleton = styled(Shimmer)`
  margin-top: 80px;
  background-color: #bdbdbd;
`;

export const NicknameSkeletonShimmer = styled(Shimmer)`
  margin-top: 8px;
  width: 120px;
  height: 15px;
  margin-left: 12px;
`;

export const NicknameSkeleton = styled(Shimmer)`
  margin-top: 80px;
  background-color: #bdbdbd;
`;

export const SectionTitleShimmer = styled(Shimmer)`
  margin-top: 48px;
  width: 220px;
  height: 25px;
  margin-left: 12px;
`;

export const SectionDescriptionShimmer = styled(Shimmer)`
  margin-top: 6px;
  width: 180px;
  height: 20px;
  margin-left: 12px;
`;

export const SectionDescription = styled.View`
  height: 80px;
  background-color: #bdbdbd;
`;

export const BookShimmer = styled(Shimmer)`
  width: 100%;
  height: 180px;
`;

export const BookSkeleton = styled.View`
  height: 80px;
  background-color: #bdbdbd;
  border-radius: 8px;
`;
