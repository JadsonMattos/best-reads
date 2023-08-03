import { useState } from 'react';
import './App.css';
import Book from './components/Book';
import BookList from './components/BookList';
import data from './data.json';
import { BookListType } from './types/index';

type CurrentListType = 'wishList' | 'readingList' | 'readList';

function App() {
  const [currentBook, setCurrentBook] = useState(0);
  const [currentList, setCurrentList] = useState<CurrentListType>('wishList');
  const [nameList, setNameList] = useState<string>('Lista de ...');
  const [wishList, setWishList] = useState<BookListType>([]);
  const [readingList, setReadingList] = useState<BookListType>([]);
  const [readList, setReadList] = useState<BookListType>([]);
  // const lists = {
  //   wishList,
  //   readingList,
  //   readList,
  // };

  const handleNextBook = () => {
    setCurrentBook((currentBook + 1) % data.length);
  };

  const handlePreviousBook = () => {
    if (currentBook === 0) {
      setCurrentBook(data.length - 1);
    } else {
      setCurrentBook(currentBook - 1);
    }
  };

  const handleNameListChange = (listName: CurrentListType) => {
    switch (listName) {
      case 'wishList':
        setNameList('Lista de desejos');
        break;
      case 'readingList':
        setNameList('Lista de leitura');
        break;
      case 'readList':
        setNameList('Lista de lidos');
        break;
      default:
        setNameList('');
        break;
    }
    setCurrentList(listName);
  };

  const getCurrentList = () => {
    if (currentList === 'wishList') {
      return wishList;
    }
    if (currentList === 'readingList') {
      return readingList;
    }
    if (currentList === 'readList') {
      return readList;
    }
    return [];
  };

  const handleDeleteBook = (bookId: number) => {
    const updatedList = getCurrentList().filter((book) => book.id !== bookId);
    switch (currentList) {
      case 'wishList':
        setWishList(updatedList);
        break;
      case 'readingList':
        setReadingList(updatedList);
        break;
      case 'readList':
        setReadList(updatedList);
        break;
      default:
        break;
    }
  };

  return (
    <div className="app">
      <div className="book-selector">
        <Book
          bookInfo={ data[currentBook] }
          showDetails
          onDelete={ handleDeleteBook }
        />
        <div className="selector-buttons">
          <button onClick={ () => setWishList([...wishList, data[currentBook]]) }>
            Adicionar à lista de desejos
          </button>
          <button onClick={ () => setReadingList([...readingList, data[currentBook]]) }>
            Adicionar à lista de leitura
          </button>
          <button onClick={ () => setReadList([...readList, data[currentBook]]) }>
            Adicionar à lista de lidos
          </button>
          <button onClick={ handleNextBook }>
            Próximo livro
          </button>
          <button onClick={ handlePreviousBook }>
            Livro anterior
          </button>
        </div>
      </div>

      <div className="list-buttons">
        <button onClick={ () => handleNameListChange('wishList') }>
          Exibir lista de desejos
        </button>
        <button onClick={ () => handleNameListChange('readingList') }>
          Exibir lista de leitura
        </button>
        <button onClick={ () => handleNameListChange('readList') }>
          Exibir lista de lidos
        </button>
      </div>
      <h1>{ nameList }</h1>
      <BookList
        books={ getCurrentList() }
        onDelete={ handleDeleteBook }
      />
    </div>
  );
}

export default App;
