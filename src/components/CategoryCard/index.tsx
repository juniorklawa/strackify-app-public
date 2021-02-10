import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import { ICategory } from '../../models/ICategory';
import getCategoryIcon from '../../utils/getCategoryIcon';
import {
  CardContainer,
  CategoryImage,
  CategoryTitle,
  ImageContainer,
  TextContainer,
} from './styles';
import { translate } from '../../locales';

const CategoryCard = ({ item }: { item: ICategory }) => {
  const navigation = useNavigation();

  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, 0.8];
  const scale = animation.interpolate({ inputRange, outputRange });

  return (
    <Animated.View
      style={{
        transform: [{ scale }],
      }}>
      <CardContainer
        activeOpacity={1}
        onPress={async () => {
          Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
          }).start();
          setTimeout(() => {
            Animated.spring(animation, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
            setTimeout(() => {
              navigation.navigate('CategoryPage', { category: item.category });
            }, 50);
          }, 80);
        }}>
        <CategoryImage
          imageStyle={styles.categoryImageStyle}
          source={{
            uri: item.imgSource,
          }}>
          <TextContainer>
            <ImageContainer source={getCategoryIcon(item)} />
            <CategoryTitle>
              {translate(`categories.${item.category}`)}
            </CategoryTitle>
          </TextContainer>
        </CategoryImage>
      </CardContainer>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  categoryImageStyle: {
    borderRadius: 5,
  },
});

export default CategoryCard;
