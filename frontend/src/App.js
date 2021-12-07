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
  let locationList = [];
  for (let i = 0; i < mainObject[0].length; i++) {
    locationList.push(mainObject[0][i]);
  }
  let unitList = [];
  for (let i = 0; i < mainObject[1].length; i++) {
    //ADD THE LOCATION NAME TO THE OBJECT

    unitList.push(mainObject[1][i]);
  }
  let roomList = [];
  for (let i = 0; i < mainObject[2].length; i++) {
    //ADD THE UNIT NAME TO THE OBJECT
    //console.log(mainObject[2][i].roomName);
    roomList.push(mainObject[2][i]);
  }
  return (
    <div className="App">
      <header className="App-header">
        <span id="headerLeft"><h1>Heaters Control</h1></span><span id="headerRigt"> </span>
      </header>
      <Settings mainObject={mainObject} backend={backend} setMainObject={setMainObject} defaultOb={defaultOb}
        locationList={locationList} unitList={unitList} roomList={roomList} />
    </div>
  );
}

export default App;
