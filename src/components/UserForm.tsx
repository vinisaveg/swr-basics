import { RequestDocument } from "graphql-request/dist/types";
import { FormEvent, FunctionComponent, useState } from "react";
import useSWR from "swr";
import { graphqlClient } from "../graphql/graphqClient";

interface CreateUserResponse {
  insert_users: {
    returning: [
      {
        id: string;
        name: string;
        rocket: string;
      }
    ];
  };
}

const UserForm: FunctionComponent = () => {
  const [username, setUsername] = useState<string>("");
  const [rocketName, setRocketName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetcher = (mutation: RequestDocument) =>
    graphqlClient.request(mutation, {
      name: username,
      rocket: rocketName,
    });

  const createUserMutation = `
        mutation insertUsers($name: String!, $rocket: String!){
            insert_users(objects: {name: $name, rocket: $rocket}) {
                returning {
                    id
                    name
                    rocket
                }
            }
        }
    `;

  const { mutate } = useSWR<CreateUserResponse>(
    isSubmitting ? createUserMutation : null,
    fetcher
  );

  const handleCreateuser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);

    const response = await mutate();

    if (response) {
      console.log(response.insert_users);
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={(event) => handleCreateuser(event)}>
      <input
        type="text"
        placeholder="user name"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="text"
        placeholder="rocket name"
        value={rocketName}
        onChange={(event) => setRocketName(event.target.value)}
      />
      <button>Create User</button>
    </form>
  );
};

export default UserForm;
