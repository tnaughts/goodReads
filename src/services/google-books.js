import axios from 'axios';
import {get} from 'lodash'
import { GOOGLE_BOOKS } from 'react-native-dotenv'

export async function getBooks(query, index=0){
  const data = await axios.get(
    'https://www.googleapis.com/books/v1/volumes' +
      '?q=' +
      query + '&startIndex=' + index.toString() +
      '&key=' +
      GOOGLE_BOOKS,
  );
  return get(data, 'data.items', []);
}
