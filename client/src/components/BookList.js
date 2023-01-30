import { Fragment } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_BOOKS = gql`
  query {
    books {
      id
      name
    }
  }
`;

function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log('>>>', data);
  return (
    <Fragment>
      <ul id="book-list">
        <li>Book name</li>
      </ul>
    </Fragment>
  );
}

export default BookList;
