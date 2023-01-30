import { useLazyQuery } from '@apollo/client';
import { Fragment, useEffect } from 'react';
import { GET_BOOK } from '../queries/queries';

function BookDetails({ bookId }) {
  const [getBook, { loading, error, data }] = useLazyQuery(GET_BOOK);

  useEffect(() => {
    if (bookId) getBook({ variables: { id: bookId } });
  }, [bookId, getBook]);

  let content = <p>No data to show. Please Select a Book.</p>;

  if (loading) content = <p>Loading Book details...</p>;
  else if (error) content = <p>{error.message}</p>;
  else if (data)
    content = (
      <Fragment>
        <p>Name: {data.book.name}</p>
        <p>Genre: {data.book.genre}</p>
        <p>Author: {data.book.author.name}</p>
        <p>All books by this author:</p>
        <ul>
          {data.book.author.books.map(b => <li key={b.id}>{b.name}</li>)}
        </ul>
      </Fragment>
    );

  return <div id="book-details">{content}</div>;
}

export default BookDetails;
