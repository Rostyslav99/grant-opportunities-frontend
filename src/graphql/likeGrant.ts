import {gql} from "@apollo/client";

export const LIKE_GRANT = gql`
  mutation LikeGrant($id: ID!, $feedback: String) {
    likeGrant(id: $id, feedback: $feedback) {
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
