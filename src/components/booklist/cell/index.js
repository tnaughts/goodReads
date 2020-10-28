import React from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import style from './style';

import {get} from 'lodash';

export const Book = props => {
  return (
    <View style={style.container}>
    <View style={style.infoContainer}>
      <Text numberOfLines={2} style={style.title}>{props.name}</Text>
      <Text numberOfLines={2} style={style.author}>{props.authors.join(', ')}</Text>
      </View>
      <Image style={style.image} source={{uri: props.thumbnail}} />
    </View>
  );
};
