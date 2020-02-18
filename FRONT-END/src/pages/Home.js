import React from 'react';
import { FavoriteCarList } from 'containers/List';
import { ListWrapper } from 'components/List';

export default function Home() {
  return (
    <ListWrapper title="My Car List">
      <FavoriteCarList />
    </ListWrapper>
  );
};