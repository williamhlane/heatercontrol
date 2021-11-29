import './App.css';
import Settings from './componites/Settings';
function App() {
  return (
    <div className="App">
      <header className="App-header">
          <span id="headerLeft"><h1>Heaters Control</h1></span><span id="headerRigt"> </span>
      </header>
      <Settings />
    </div>
  );
}

export default App;
