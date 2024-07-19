// App.tsx
import { useQuery, useMutation } from '@apollo/client';
import { DISLIKE_GRANT, GET_ALL_GRANTS, GET_NEW_OPPORTUNITIES, LIKE_GRANT } from "./graphql";
import OpportunityCard from "./components/OpportunityCard.tsx";
import GrantTable from "./components/GrantTable.tsx";
import { Grant } from "./types";

function App() {
  const { loading: allGrantsLoading, error: allGrantsError, data: allGrantsData, refetch: refetchAllGrants } = useQuery(GET_ALL_GRANTS);
  const { loading: newOpportunitiesLoading, error: newOpportunitiesError, data: newOpportunitiesData, refetch: refetchNewOpportunities } = useQuery(GET_NEW_OPPORTUNITIES);

  const [likeGrantMutation] = useMutation(LIKE_GRANT);
  const [dislikeGrantMutation] = useMutation(DISLIKE_GRANT);

  const handleLikeGrant = async (id: number, feedback?: string) => {
    try {
      await likeGrantMutation({ variables: { id, feedback } });
      await refetchAllGrants();
      await refetchNewOpportunities();
    } catch (error) {
      console.error('Error liking grant:', error);
    }
  };

  const handleDislikeGrant = async (id: number, feedback?: string) => {
    try {
      await dislikeGrantMutation({ variables: { id, feedback } });
      await refetchAllGrants();
      await refetchNewOpportunities();
    } catch (error) {
      console.error('Error disliking grant:', error);
    }
  };

  if (allGrantsLoading || newOpportunitiesLoading) return <p>Loading...</p>;
  if (allGrantsError) return <p>Error: {allGrantsError.message}</p>;
  if (newOpportunitiesError) return <p>Error: {newOpportunitiesError.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">New Matches</h1>
      <div className="flex flex-row gap-2 overflow-scroll py-2">
        {newOpportunitiesData.getNewOpportunities.map((grant: Grant) => (
          <OpportunityCard key={grant.id} grant={grant} onLike={handleLikeGrant} onDislike={handleDislikeGrant} />
        ))}
      </div>
      <h1 className="text-3xl font-bold mt-8 mb-4">All Grant Opportunities</h1>
      <GrantTable grants={allGrantsData.getAllGrants} />
    </div>
  );
}

export default App;
