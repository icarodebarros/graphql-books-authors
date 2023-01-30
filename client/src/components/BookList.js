import { Fragment } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../queries/queries';


function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading Books...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <Fragment>
      <ul id="book-list">
        <li>Book name</li>
        {data.books.map((book) => (
          <li key={book.id}>{book.name}</li>
        ))}
      </ul>
    </Fragment>
  );
}

export default BookList;
