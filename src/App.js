import './App.css';
import Router from "./Route/Router";
import Login from "./Pages/LoginPage/Login";
import Logout from "./Pages/LogoutPage/Logout";
import CreateWorkspace from "./Components/WorkspaceModal/CreateWorkspace";
import InviteFriendWorkspace from "./Components/WorkspaceModal/InviteFriendWorkspace";

function App() {
  return (
    <div className="App">
        <Router />
    </div>
  );
}

export default App;
