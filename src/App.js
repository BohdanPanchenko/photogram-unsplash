import "./App.css";
import Photogram from "./components/photogram/Photogram";
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Photogram />
      </Provider>
    </div>
  );
}

export default App;
