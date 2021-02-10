import { FunctionComponent } from "react";
import { RequestDocument } from "graphql-request/dist/types";
import { graphqlClient } from "../graphql/graphqClient";
import useSWR from "swr";

const Rockets: FunctionComponent = () => {
  const fetcher = (query: RequestDocument) => graphqlClient.request(query);

  const rocketsQuery = `
    {
      rockets {
        active
        name
        mass {
          kg
        }
        description
      }
    }
  `;

  const { data, error } = useSWR(rocketsQuery, fetcher);

  if (data) {
    return (
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <pre>Something went bad :(</pre>
      </div>
    );
  }

  return (
    <div>
      <span>Loading rockets...</span>
    </div>
  );
};

export default Rockets;
