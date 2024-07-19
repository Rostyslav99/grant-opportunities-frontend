import {gql} from "@apollo/client";

export const DISLIKE_GRANT = gql`
  mutation DislikeGrant($id: ID!, $feedback: String) {
    dislikeGrant(id: $id, feedback: $feedback) {
      id
      title
      description
      deadlineDate
      matchDate
      avgAmount
      location
      status
      feedback
    }
  }
`;