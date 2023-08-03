import { BookInfoType } from '../types';

type BookProps = {
  bookInfo: BookInfoType;
  showDetails: boolean;
  onDelete: (bookId: number) => void;
};

export default function Book({ bookInfo, showDetails, onDelete }: BookProps) {
  const { id, title, image, author, description } = bookInfo;

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="book">
      <img src={ image } alt={ title } />
      <h1>{ title }</h1>
      <h3>{ author }</h3>
      { showDetails && <p>{ description }</p> }
      { !showDetails && (
        <button className="delete" onClick={ handleDelete }>
          Excluir
        </button>
      )}
    </div>
  );
}
