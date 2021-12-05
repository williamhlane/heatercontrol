import { useState } from "react";
const Settings = ({ mainObject, backend, setMainObject, defaultOb}) => {
    let locationList = [];
    console.log(mainObject[0]);
    for (let i = 0; i < mainObject[0].length; i++) {
        locationList.push(mainObject[0][i]);
    }
    let unitList = [];
    for (let i = 0; i < mainObject[1].length; i++) {
        unitList.push(mainObject[1][i]);
    }
    let roomList = [];
    for (let i = 0; i < mainObject[2].length; i++) {
        roomList.push(mainObject[2][i]);
    }
    const [delLocationId, setDelLocationId] = useState();
    const [locationSelected, setLocationSelected] = useState(null);
    const [delUnitId, setDelUnitId] = useState();
    const [delRoomId, setDelRoomId] = useState();
    /*CRASHING INF LOOP NEED TO SET locationSelected with first value
    if(locationList !== []){
        setLocationSelected(locationList[0].id);
    }
    */
  /***
   * NOTES!
   * Put the fetches in one function, use async await, put the .thens in a value
   * let fetchfunc;
   * const fetchfunc = (array) => {
   * const fetchthen = fetch();
   * 
   * }
   * 
   * function async (){
   * array['method', 'url', 'body'];
   * await fetchfunc(array);
   * 
   * }
   */


    const newLocation = (e) => {
        e.preventDefault();
        const body = `{ "locationId" : "${document.getElementById('locationName').value}", "timePassedToSrv" : "${Date()}" }`;
        fetch(`${backend}/location`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body,
        }).then((res) => {
            return res.json();
        }).then((res) => {
            if(res.results !== "Created"){
                console.log("Error");
            };
            setMainObject(defaultOb);
        }).catch((error) => {
            console.log(error);
        });
    }
    const delLocation = (e) => {
        e.preventDefault();
        const body = `{ "locationId" : "${delLocationId}", "timePassedToSrv" : "${Date()}" }`;
        fetch(`${backend}/location`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body,
        }).then((res) => {
            return res.json();
        }).then((res) => {
            if(res.results !== "Deleted"){
                console.log("Error");
            };
            setMainObject(defaultOb);
        }).catch((error) => {
            console.log(error);
        }); 
    }
    const newunit = (e) => {
        e.preventDefault();
        const body = `{ "unitName" : "${document.getElementById('unitName').value}", "locationId" : "${locationSelected}", "timePassedToSrv" : "${Date()}" }`;
        fetch(`${backend}/units`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body,
        }).then((res) => {
            return res.json();
        }).then((res) => {
            console.log(res.results);
        }).catch((error) => {
            console.log(error);
        });
    }
    const delUnit = (e) => {
        e.preventDefault();
        //delUnitId

    }
    const newroom = (e) => {
        e.preventDefault();
        const body = `{ "roomName" : "${document.getElementById('roomName').value}", "currentTemp" : "100", "timePassedToSrv" : "${Date()}" }`;
        fetch(`${backend}/createroom`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body,
        }).then((res) => {
            return res.json();
        }).then((res) => {
            console.log(res.results);
        }).catch((error) => {
            console.log(error);
        });
    }
    const delRoom = (e) => {
        e.preventDefault();
        //delRoomId
    }

    return (
        <div id="settings">

            <h1>Settings</h1>
            <div>
                <h3>Location</h3>

                <form onSubmit={newLocation}>
                    <label>Create Location</label>
                    <input type='text' id="locationName" />
                    <input type='submit' />
                </form>
                <form onSubmit={delLocation}>
                    <label>Delete Location</label>
                    <select onChange={(e) => setDelLocationId(e.target.value)}>
                        {
                        locationList.map((loc, index) => (
                            <option key={index} value={loc.id} >{loc.locName}</option>
                        ))
                        }
                        </select>
                    <input type='submit' />
                </form>
            </div>
            <div>

                <h3>Units</h3>

                <form onSubmit={newunit}>
                    <label>Create Unit</label>
                    
                    <select onChange={(e) => setLocationSelected(e.target.value)}>
                        {
                        locationList.map((loc, index) => (
                            <option key={index} value={loc.id} >{loc.locName}</option>
                        ))
                        }
                        </select>
                        <br />
                    <input type='text' id="unitName" />
                    <input type='submit' />
                </form>
                <form onSubmit={delUnit}>
                    <label>Delete Unit</label>
                    <select onChange={(e) => setDelUnitId(e.target.value)}>
                        {
                        unitList.map((unit, index) => (
                            <option key={index} value={unit.id}>{unit.unitName}</option>
                        ))
                        }
                        </select>
                    <input type='submit' />
                </form>
            </div>
            <div>

                <h3>Rooms</h3>

                <form onSubmit={newroom}>
                    <label>Create Room</label>
                    <input type='text' id="roomName" />
                    <input type='submit' />
                </form>
                <form onSubmit={delRoom}>
                    <label>Delete Room</label>
                    <select onChange={(e) => setDelRoomId(e.target.value)}>
                        {
                        roomList.map((room, index) => (
                            <option key={index} value={room.id}>{room.roomName}</option>
                        ))
                        }
                        </select>
                    <input type='submit' />
                </form>
            </div>

        </div>

    )
}
export default Settings