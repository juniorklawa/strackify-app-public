import React from 'react';
import {
  Container,
  CoverShimmer,
  CoverSkeleton,
  DescriptionShimmer,
  DescriptionSkeleton,
  TextContainer,
  TitleShimmer,
  TitleSkeleton,
  TrackContainer,
} from './styles';

const PlaylistSkeleton: React.FC = () => {
  const list = [1, 2, 3, 4, 5, 6, 7];

  return (
    <Container>
      {list.map((item) => (
        <TrackContainer key={item.toString()}>
          <CoverShimmer animationOpacity={0.8} opacity={0.5}>
            <CoverSkeleton />
          </CoverShimmer>
          <TextContainer>
            <TitleShimmer animationOpacity={0.8} opacity={0.5}>
              <TitleSkeleton />
            </TitleShimmer>

            <DescriptionShimmer animationOpacity={0.8} opacity={0.5}>
              <DescriptionSkeleton />
            </DescriptionShimmer>
          </TextContainer>
        </TrackContainer>
      ))}
    </Container>
  );
};

export default PlaylistSkeleton;
