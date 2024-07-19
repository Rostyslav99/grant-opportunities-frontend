import { gql } from '@apollo/client';

export const GET_ALL_GRANTS = gql`
  query GetAllGrants {
    getAllGrants {
      id
      title
      description
      deadlineDate
      matchDate
      companyName
      avgAmount
      location
      status
      feedback
    }
  }
`;
