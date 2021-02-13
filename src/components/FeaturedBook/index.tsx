import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useCallback } from 'react';
import { Animated } from 'react-native';
import { IBook } from '../../models/IBook';
import { BookAuthor, BookButton, BookCover, BookTitle } from './styles';

interface IFeaturedBookProps {
  book: IBook;
}

const FeaturedBook: React.FC<IFeaturedBookProps> = ({ book }) => {
  const navigation = useNavigation();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, 0.8];
  const scale = animation.interpolate({ inputRange, outputRange });

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleAnimation = useCallback(() => {
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
        navigation.navigate('PlaylistPage', {
          playlist: book.bestPlaylist._doc,
        });
      }, 50);
    }, 80);
  }, [animation, book.bestPlaylist, navigation]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ scale }],
      }}>
      <BookButton activeOpacity={1} key={book._id} onPress={handleAnimation}>
        <BookCover
          source={{
            uri: book.bookCoverUrl,
          }}
        />
        <BookTitle numberOfLines={1}>{book.title}</BookTitle>
        <BookAuthor numberOfLines={1}>{book.author}</BookAuthor>
      </BookButton>
    </Animated.View>
  );
};

export default FeaturedBook;
