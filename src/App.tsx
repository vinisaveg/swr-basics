import "./app.css";
import UserForm from "./components/UserForm";

// import Rockets from "./components/Rockets";
import Users from "./components/Users";

const App = () => {
  return (
    <div className="App">
      {/* <Rockets /> */}

      <Users />

      <UserForm />
    </div>
  );
};

export default App;
