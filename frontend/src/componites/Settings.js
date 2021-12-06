import { useState } from "react";
const Settings = ({ mainObject, backend, setMainObject, defaultOb }) => {
    let locationList = [];
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
    const [locationSelected, setLocationSelected] = useState();
    const [delUnitId, setDelUnitId] = useState();
    const [unitSelected, setUnitSelected] = useState();
    const [delRoomId, setDelRoomId] = useState();
    if (mainObject !== defaultOb) {
        setTimeout(() => {
            if (locationList.length > 0) {
                setLocationSelected(locationList[0].id);
                setDelLocationId(locationList[0].id);
            }
            if (unitList.length > 0) {
                setUnitSelected(unitList[0].id);
            }
            if (roomList.length > 0) {
                setDelRoomId(roomList[0].id);
            }
        }, 0);
    }

    /***
     * NOTES!
     * Put the fetches in one function, use async await, put the .thens in a value.//
     *SHOW UNIT THAT ROOM IS ASSIGNED TO AND LOCATION UNIT IS ASIGNED TO
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
        const body = `{ "locName" : "${document.getElementById('locationName').value}", "timePassedToSrv" : "${Date()}" }`;
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
            if (res.results !== "Created") {
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
            if (res.results !== "Deleted") {
                console.log("Error" + res.results);
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
            document.getElementById('unitName').value = "";
        }).catch((error) => {
            console.log(error);
        });
        setMainObject(defaultOb);
    }
    const delUnit = (e) => {
        e.preventDefault();
        const body = `{ "id" : "${delRoomId}", "timePassedToSrv" : "${Date()}" }`;
        fetch(`${backend}/units`, {
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
            if (res.results !== "Deleted") {
                console.log("Error");
            };
            setMainObject(defaultOb);
        }).catch((error) => {
            console.log(error);
        });

    }

    const newroom = async (e) => {
        e.preventDefault();
        let locationId;
        unitList.map((unit, index) => {
            if (unit.id === unitSelected) {
                locationId = unit.locationId;
                console.log(locationId)
            }
            return unit.id;
        });
        const body = `{ "roomName" : "${document.getElementById('roomName').value}", "currentTemp" : "100", "timePassedToSrv" : "${Date()}",
         "locationId" : "${locationId}", "unitId" : "${unitSelected}" }`;
        await fetch(`${backend}/rooms`, {
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
            document.getElementById('roomName').value = '';
            setMainObject(defaultOb);
        }).catch((error) => {
            console.log(error);
        });
    }
    const delRoom = (e) => {
        e.preventDefault();
        console.log(delRoomId);
        const body = `{ "id" : "${delRoomId}", "timePassedToSrv" : "${Date()}" }`;
        fetch(`${backend}/rooms`, {
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
            if (res.results !== "Deleted") {
                console.log("Error"+ res.results);
            };
            setMainObject(defaultOb);
        }).catch((error) => {
            console.log(error);
        });
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
                    {locationList.length > 0 ? <><select onChange={(e) => setDelLocationId(e.target.value)}>
                        {
                            locationList.map((loc, index) => (
                                <option key={index} value={loc.id} >{loc.locName}</option>
                            ))
                        }
                    </select>
                        <input type='submit' /></> : "No Locations to delete."}
                </form>


            </div>
            <div>

                <h3>Units</h3>

                <form onSubmit={newunit}>
                    <label>Create Unit</label>

                    {locationList.length > 0 ? <>Add to location:
                        <select onChange={(e) => setLocationSelected(e.target.value)}>
                            {
                                locationList.map((loc, index) => (
                                    <option key={index} value={loc.id} >{loc.locName}</option>
                                ))
                            }
                        </select>
                        <br />
                        <input type='text' id="unitName" />
                        <input type='submit' /></> : "A location needs to be created before you can add a unit."}
                </form>

                <form onSubmit={delUnit}>
                    <label>Delete Unit</label>
                    {unitList.length > 0 ? <select onChange={(e) => setDelUnitId(e.target.value)}>
                        {
                            unitList.map((unit, index) => (
                                <option key={index} value={unit.id}>{unit.unitName}</option>
                            ))
                        }
                    </select> : null}
                    {unitList.length > 0 ? <input type='submit' /> : "No units to delete"}
                </form>
            </div>
            <div>

                <h3>Rooms</h3>
                <form onSubmit={newroom}>
                    <label>Create Room</label>
                    {unitList.length > 0 ? <>Add room to Unit:
                        <select onChange={(e) => setUnitSelected(e.target.value)}>
                            {
                                unitList.map((unit, index) => (
                                    <option key={index} value={unit.id}>{unit.unitName}</option>
                                ))
                            }
                        </select>
                        <br />
                        <input type='text' id="roomName" />
                        <input type='submit' /></> : "A Unit needs to be created before you can add rooms."}
                </form>


                <form onSubmit={delRoom}>
                    <label>Delete Room</label>
                    {roomList.length > 0 ? <select onChange={(e) => setDelRoomId(e.target.value)}>
                        {
                            roomList.map((room, index) => (
                                <option key={index} value={room.id}>{room.roomName}</option>
                            ))
                        }
                    </select> : null}
                    {roomList.length > 0 ? <input type='submit' /> : 'No Rooms to delete yet.'}
                </form>
            </div>

        </div>

    )
}
export default Settings