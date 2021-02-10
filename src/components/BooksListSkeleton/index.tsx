import React from 'react';
import { BookResultShimmer, BookResultSkeleton } from './styles';

const BooksListSkeleton: React.FC = () => {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <>
      {list.map((item) => (
        <BookResultShimmer key={item} animationOpacity={0.8} opacity={0.5}>
          <BookResultSkeleton />
        </BookResultShimmer>
      ))}
    </>
  );
};

export default BooksListSkeleton;
