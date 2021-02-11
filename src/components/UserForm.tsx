import { FormEvent, FunctionComponent, useState } from "react";
import { graphqlClient } from "../graphql/graphqClient";

const UserForm: FunctionComponent = () => {
  const [username, setUsername] = useState<string>("");
  const [rocketName, setRocketName] = useState<string>("");

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

  const handleCreateuser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await graphqlClient.request(createUserMutation, {
      name: username,
      rocket: rocketName,
    });

    console.log(response);
  };

  return (
    <form onSubmit={(event) => handleCreateuser(event)}>
      <input
        type="text"
        placeholder="username"
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
