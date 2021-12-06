import './App.css';
import Settings from './componites/Settings';
import { useState } from "react";

function App() {
  const backend = "http://192.168.0.180:3001";
  const defaultOb = '[[{"id":0,"locName":"Loading","description": null }][][]]';
  const [mainObject, setMainObject] = useState(defaultOb);
  if (mainObject === defaultOb) {
    fetch(`${backend}/mainobject`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((responce) => {
      return responce.json();
    }).then((responce) => {
      setMainObject(responce);
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <span id="headerLeft"><h1>Heaters Control</h1></span><span id="headerRigt"> </span>
      </header>
      <Settings mainObject={mainObject} backend={backend} setMainObject={setMainObject} defaultOb={defaultOb}/>
    </div>
  );
}

export default App;
