import './App.css';
import Topbar from './components/Topbar/Topbar';
import Order from './components/Order/Order';
import Plan from './components/Plan/Plan';
import Discover from './components/Discover/Discover';

function App() {

  return (
    <div className="App">
      <Topbar></Topbar>
      <div className="content">
        <Discover/>
        <Plan/>
        <Order/>
      </div>
    </div>
  );
}

export default App;
