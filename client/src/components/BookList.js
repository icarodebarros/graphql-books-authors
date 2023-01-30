import { Fragment, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../queries/queries';
import BookDetails from './BookDetails';

function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [selectedBookid, setSelectedBookId] = useState('');

  if (loading) return <p>Loading Books...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <Fragment>
      <ul id="book-list">
        {data.books.map((book) => (
          <li key={book.id} onClick={() => setSelectedBookId(book.id)}>
            {book.name}
          </li>
        ))}
      </ul>
      <BookDetails bookId={selectedBookid} />
    </Fragment>
  );
}

export default BookList;
