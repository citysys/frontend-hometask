import { useStore } from "./controller";
import Signup from "./view/pages/Signup";
import Test from "./view/pages/test";

function App() {
  const store = useStore()
  return (
    <div className="App">
      <div className="hello">
        שלום {store.user.name || 'אורח'}
      </div>
        <Signup />
    </div>
  );
}

export default App;
