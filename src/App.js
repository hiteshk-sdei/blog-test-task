import './App.scss';
import "./Assets/scss/style.scss";
import { BrowserRouter } from 'react-router-dom';
import IndexRoute from './Routes/IndexRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <IndexRoute/>
      </BrowserRouter>
    </div>
  );
}

export default App;
