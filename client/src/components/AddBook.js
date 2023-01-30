import { useQuery } from '@apollo/client';
import { GET_AUTHORS } from '../queries/queries';

function AddBook() {
  const { loading, error, data } = useQuery(GET_AUTHORS);

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
    <form id="add-book">
      <div className="field">
        <label>Book name:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Author:</label>
        <select>
          <option>Select author</option>
          {options}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default AddBook;
