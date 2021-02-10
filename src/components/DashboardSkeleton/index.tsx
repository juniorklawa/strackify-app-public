import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import {
  AvatarSkeleton,
  BookShimmer,
  BookSkeleton,
  BookSkeletonShimmer,
  Container,
  GreetinSkeleton,
  GreetinSkeletonShimmer,
  NicknameSkeleton,
  NicknameSkeletonShimmer,
  ProfileRow,
  SectionDescription,
  SectionDescriptionShimmer,
  SectionTitleShimmer,
} from './styles';

const DashboardSkeleton: React.FC = () => {
  return (
    <Container>
      <ProfileRow>
        <BookSkeletonShimmer animationOpacity={0.8} opacity={0.5}>
          <AvatarSkeleton />
        </BookSkeletonShimmer>
        <View>
          <GreetinSkeletonShimmer animationOpacity={0.8} opacity={0.5}>
            <GreetinSkeleton />
          </GreetinSkeletonShimmer>

          <NicknameSkeletonShimmer animationOpacity={0.8} opacity={0.5}>
            <NicknameSkeleton />
          </NicknameSkeletonShimmer>
        </View>
      </ProfileRow>

      <SectionTitleShimmer animationOpacity={0.8} opacity={0.5}>
        <GreetinSkeleton />
      </SectionTitleShimmer>

      <SectionDescriptionShimmer animationOpacity={0.8} opacity={0.5}>
        <SectionDescription />
      </SectionDescriptionShimmer>

      <FlatGrid
        showsVerticalScrollIndicator={false}
        data={[1, 2]}
        itemDimension={120}
        style={styles.gridView}
        renderItem={() => (
          <BookShimmer animationOpacity={0.8} opacity={0.5}>
            <BookSkeleton />
          </BookShimmer>
        )}
        keyExtractor={(item) => item.toString()}
      />

      <SectionTitleShimmer animationOpacity={0.8} opacity={0.5}>
        <GreetinSkeleton />
      </SectionTitleShimmer>

      <SectionDescriptionShimmer animationOpacity={0.8} opacity={0.5}>
        <SectionDescription />
      </SectionDescriptionShimmer>

      <FlatGrid
        showsVerticalScrollIndicator={false}
        data={[1, 2]}
        itemDimension={120}
        style={styles.gridView}
        renderItem={() => (
          <BookShimmer animationOpacity={0.8} opacity={0.5}>
            <BookSkeleton />
          </BookShimmer>
        )}
        keyExtractor={(item) => item.toString()}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
  },
});

export default DashboardSkeleton;
