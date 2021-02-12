import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import Stars from 'react-native-stars';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCollapsibleHeader } from 'react-navigation-collapsible';
import { GoBackButton } from '../../components/AuthModal/styles';
import { GOOGLE_API_URL } from '../../config/constants';
import { IBook } from '../../models/IBook';
import api from '../../services/api';
import {
  BookAuthor,
  BookCover,
  BookDescriptionContainer,
  BookPages,
  BookTitle,
  DescriptionContent,
  DescriptionTitle,
  HeaderContainer,
  InformationContainer,
  RatingText,
  StarsContainer,
} from './styles';
import { translate } from '../../locales';

interface IRoute {
  route: {
    params: {
      book: IBook;
    };
  };
}

interface IFetchedBook {
  volumeInfo: {
    title: string;
    imageLinks: {
      medium: string;
      thumbnail: string;
    };
    authors: string[];
    pageCount: number;
    averageRating: number;
    description: string;
  };
}

const BookDetailsPage = ({ route }: IRoute) => {
  const { book } = route.params;
  const [fetchedBook, setFetchedBook] = useState<IFetchedBook | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const options = {
    navigationOptions: {
      headerTitleStyle: {
        color: '#1b1a24',
        fontFamily: 'OpenSans-Bold',
      },
      headerStyle: { backgroundColor: '#fff' },
      title: translate('book_details.title'),
      headerLeft: () => (
        <GoBackButton
          onPress={() => {
            navigation.goBack();
          }}>
          <Entypo name="chevron-thin-left" color="#1b1a24" size={24} />
        </GoBackButton>
      ),
    },
  };
  const {
    onScroll,
    containerPaddingTop,
    scrollIndicatorInsetTop,
  } = useCollapsibleHeader(options);

  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
      const url = `${GOOGLE_API_URL}/${book.bookId}`;
      setIsLoading(true);
      const response = await api.get(url);
      setIsLoading(false);
      setFetchedBook(response.data);
    }
    fetchData();
  }, [book.bookId]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        contentContainerStyle={{ paddingTop: containerPaddingTop }}
        scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
        style={styles.scrollViewContainer}>
        <HeaderContainer>
          <BookCover
            resizeMode="cover"
            source={{
              uri: fetchedBook?.volumeInfo?.imageLinks?.thumbnail,
            }}
          />
          <InformationContainer>
            <BookTitle>{fetchedBook?.volumeInfo?.title}</BookTitle>

            <BookAuthor>
              {`${translate('book_details.by')} ${
                fetchedBook?.volumeInfo?.authors[0]
              }`}
            </BookAuthor>

            <BookPages>
              {`${fetchedBook?.volumeInfo?.pageCount} ${translate(
                'book_details.pages',
              )}`}
            </BookPages>

            {fetchedBook?.volumeInfo?.averageRating && (
              <>
                <RatingText>
                  {`${translate('book_details.rating')} (${
                    fetchedBook?.volumeInfo?.averageRating
                  })`}
                </RatingText>

                <StarsContainer>
                  <Stars
                    default={fetchedBook?.volumeInfo?.averageRating}
                    count={5}
                    half={true}
                    fullStar={<Icon size={24} name={'star'} color="#EF6C00" />}
                    emptyStar={
                      <Icon size={24} name={'star-outline'} color="#EF6C00" />
                    }
                    halfStar={
                      <Icon size={24} name={'star-half'} color="#EF6C00" />
                    }
                  />
                </StarsContainer>
              </>
            )}
          </InformationContainer>
        </HeaderContainer>
        <BookDescriptionContainer>
          <DescriptionTitle>
            {translate('book_details.description')}
          </DescriptionTitle>

          <DescriptionContent>
            {fetchedBook?.volumeInfo?.description}
          </DescriptionContent>
        </BookDescriptionContainer>
      </Animated.ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
  },
});

export default BookDetailsPage;
