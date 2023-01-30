import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query {
    books {
      id
      name
    }
  }
`;

export const GET_AUTHORS = gql`
  query {
    authors {
      id
      name
    }
  }
`;

export const ADD_BOOK = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`;
