import { FunctionComponent } from "react";
import { RequestDocument } from "graphql-request/dist/types";
import { graphqlClient } from "../graphql/graphqClient";
import useSWR from "swr";

const Users: FunctionComponent = () => {
  const fetcher = (query: RequestDocument) => graphqlClient.request(query);

  const usersQuery = `
    {
        users {
        id
        name
        rocket
        }
    }
  
  `;

  const { data, error } = useSWR(usersQuery, fetcher);

  if (data) {
    return (
      <div>
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Something went bad!</div>;
  }

  return (
    <div>
      <span>Loading Users...</span>
    </div>
  );
};

export default Users;
