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
import {get} from 'lodash';
import axios from 'axios';
import {Booklist} from '../booklist';
import {getBooks} from '../../services/google-books';
import style from './style';

export const Home = props => {
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });
  }, [props.navigation]);

  const [searchVal, setSearchVal] = useState('');
  const [books, setBooks] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const executeSearch = setTimeout(() => {
      if (searchVal.length > 2) {
        searchBooks();
      }
      if (searchVal.length < 2){
        setBooks([])
      }
      setTyping(false);
    }, 2000);

    return () => clearTimeout(executeSearch);
  }, [searchVal]);

  function handleTextChange(e) {
    setTyping(true);
    setSearchVal(e);
  }

  async function searchBooks() {
    if (searchVal.length < 2) {
      return [];
    }
    setIsSearching(true);
    const books = await getBooks(searchVal);
    setBooks(books);
    setIsSearching(false);
  }

  async function searchMoreBooks(){
    const refetchedBooks = await getBooks(searchVal, books.length)
    setBooks(books.concat(refetchedBooks))
  }

  function renderBookList() {
    if (isSearching || typing) {
      return <ActivityIndicator style={style.actionContainer} />;
    }
    if (books.length < 1) {
      return (
        <View style={style.actionContainer}>
          {searchVal.length > 1 ?
            <Text style={style.errorText}>No Books found for "{searchVal}"</Text>
            :
            <Text style={style.errorText}>Please enter a search query</Text>
          }
        </View>
      );
    }

    return (
      <Booklist
        books={books}
        navigation={props.navigation}
        loading={isSearching}
        refetch={() => {
          searchMoreBooks()
        }}
      />
    );
  }

  return (
    <View style={style.container}>
      <View><TextInput
        value={searchVal}
        placeholder={'Search for books'}
        clearButtonMode={'while-editing'}
        onChangeText={handleTextChange}
        style={style.searchBar}
        autoCorrect={false}
      />
      {typing || isSearching ?
        <ActivityIndicator style={style.textLoader}/>
        :
        null
      }
      </View>
      {renderBookList()}
    </View>
  );
};
