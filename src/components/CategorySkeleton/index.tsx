import React from 'react';
import { StyleSheet } from 'react-native';
import Shimmer from 'react-native-shimmer';
import { FlatGrid } from 'react-native-super-grid';
import { CategoryCardSkeleton, Container } from './styles';

const CategorySkeleton: React.FC = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Container>
      <FlatGrid
        showsVerticalScrollIndicator={false}
        data={data}
        itemDimension={130}
        style={styles.gridView}
        spacing={10}
        renderItem={() => (
          <Shimmer animationOpacity={0.8} opacity={0.5}>
            <CategoryCardSkeleton />
          </Shimmer>
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

export default CategorySkeleton;
