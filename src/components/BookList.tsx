import { BookInfoType } from '../types';
import Book from './Book';

type BookListProps = {
  books: BookInfoType[],
  onDelete: (bookId: number) => void,
};

export default function BookList(props: BookListProps) {
  const { books, onDelete } = props;

  const handleDelete = (bookId: number) => {
    onDelete(bookId);
  };

  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={ book.id }>
          <Book
            bookInfo={ book }
            showDetails={ false }
            onDelete={ handleDelete }
          />
        </li>
      ))}
    </ul>
  );
}
