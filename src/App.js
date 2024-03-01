import './App.css';
import CommonTable from './Components/CommonTable';
import './index.css';
import { Provider } from 'react-redux';
import {store} from './Store/store';

function App() {
  return (
    <>
     <Provider store={store}>
    <div className="App">
      <CommonTable/>
    </div>
      </Provider>
      </>
  );
}

export default App;
