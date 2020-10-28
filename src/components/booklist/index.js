import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Book} from './cell';

import {get} from 'lodash';

export const Booklist = props => {
  function renderItem({item: book}) {
    const title = get(book, 'volumeInfo.title', 'Unknown');
    const authors = get(book, 'volumeInfo.authors', []);
    const thumbnail = get(book, 'volumeInfo.imageLinks.smallThumbnail', '');
    const id = get(book, 'id', null);
    return (
      <Animatable.View useNativeDriver animation={'fadeIn'}>
        <Book name={title} authors={authors} thumbnail={thumbnail} id={id} />
      </Animatable.View>
    );
  }

  return (
    <FlatList
      style={{flex: 1}}
      initialNumToRender={5}
      windowSize={3}
      data={props.books}
      renderItem={renderItem}
      onEndReachedThreshold={0.1}
      onEndReached={props.refetch}
      keyExtractor={(item, index) => item.id + index}
    />
  );
};
