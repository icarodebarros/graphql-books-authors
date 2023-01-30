import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { ADD_BOOK, GET_AUTHORS } from '../queries/queries';

function AddBook() {
  const { loading, error, data } = useQuery(GET_AUTHORS);
  const [addBookMutation, { mData, mLoading, mError }] = useMutation(ADD_BOOK);
  
  const [book, setBook] = useState({ name: '', genre: '', authorId: '' });

  const onSubmitHandler = (ev) => {
    ev.preventDefault();
    addBookMutation({ variables: { name: book.name, genre: book.genre, authorId: book.authorId } })
      .then(info => console.log('info', info));
  };

  let options;
  if (loading) {
    options = <option disabled>Loading authors</option>;
  } else if (error) {
    options = <option disabled>Error : {error.message}</option>;
  } else if (data && data.authors) {
    options = data.authors.map((author) => {
      return (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      );
    });
  }

  return (
    <form id="add-book" onSubmit={onSubmitHandler}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          value={book.name}
          onChange={(ev) =>
            setBook((curBook) => ({ ...curBook, name: ev.target.value }))
          }
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          value={book.genre}
          onChange={(ev) =>
            setBook((curBook) => ({ ...curBook, genre: ev.target.value }))
          }
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select
          onChange={(ev) =>
            setBook((curBook) => ({ ...curBook, authorId: ev.target.value }))
          }
        >
          <option>Select author</option>
          {options}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default AddBook;
