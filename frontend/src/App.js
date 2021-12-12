import './App.css';
import Settings from './componites/Settings';
import Main from './componites/Main';
import { useState } from "react";

function App() {
  const backend = "http://192.168.0.180:3001";
  const defaultOb = '[[{"id":0,"locName":"Loading","description": null }][][]]';
  let loggedin = true;
  const [mainObject, setMainObject] = useState(defaultOb);
  const [showWhatComp, setShowWhatComp] = useState("main");
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
  let push;
  for (let i = 0; i < mainObject[1].length; i++) {
    let locationName;
    locationList.map((location, index) => {
      if (parseInt(location.id) === parseInt(mainObject[1][i].locationId)) {
        locationName = location.locName;
      }
      return location.locName;
    });
    push = {
      "id": mainObject[1][i].id,
      "unitName": `${mainObject[1][i].unitName}`,
      "locationId": parseInt(mainObject[1][i].locationId),
      "desiredTemp": parseInt(mainObject[1][i].desiredTemp),
      "controlRoom": `${mainObject[1][i].controlRoom}`,
      "locationName": `${locationName}`
    };
    unitList.push(push);
  }
  let roomList = [];
  for (let i = 0; i < mainObject[2].length; i++) {
    let locationName;
    let unitName;
    unitList.map((unit, index) => {
      if (parseInt(unit.id) === parseInt(mainObject[2][i].unitId)) {
        locationName = unit.locationName;
        unitName = unit.unitName;
      }
      return unit.locName;
    });
    push = {
      "id": mainObject[2][i].id,
      "roomName": `${mainObject[2][i].roomName}`,
      "locationId": mainObject[2][i].locationId,
      "unitId": mainObject[2][i].unitId,
      "currentTemp": mainObject[2][i].currentTemp,
      "updatedAt": `${mainObject[2][i].updatedAt}`,
      "unitName": `${unitName}`,
      "locationName": `${locationName}`
    }
    roomList.push(push);
  }

  return (
    <div className="App">
      <header className="App-header">
        <span id="headerLeft"><h1>Heaters Control</h1></span><span id="headerRigt"> </span>
      </header>
      {loggedin === true ? <>
        <div>
          {showWhatComp === "settings" ?
            <button onClick={() => setShowWhatComp("main")}>Main</button>
            :
            <button onClick={() => setShowWhatComp("settings")}>Settings</button>
          }</div>
        {showWhatComp === "settings" ?
          <Settings backend={backend} setMainObject={setMainObject} defaultOb={defaultOb}
            locationList={locationList} unitList={unitList} roomList={roomList} />
          :
          <Main setMainObject={setMainObject} defaultOb={defaultOb} backend={backend} locationList={locationList} unitList={unitList} roomList={roomList} />
        }
      </>
        :
        <div>
          <p>Please log into the appication.</p>
        </div>}
    </div>
  );
}

export default App;
