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