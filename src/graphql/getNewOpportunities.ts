import {gql} from "@apollo/client";

export const GET_NEW_OPPORTUNITIES = gql`
  query GetNewOpportunities {
    getNewOpportunities {
      id
      title
      description
      deadlineDate
      companyName
      matchDate
      avgAmount
      location
      status
      feedback
    }
  }
`;
