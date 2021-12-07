
const Settings = ({ mainObject, backend, setMainObject, defaultOb, locationList, unitList, roomList }) => {
    /***
     * NOTES!
     * Put the fetches in one function, use async await, put the .thens in a value.//
     *SHOW UNIT THAT ROOM IS ASSIGNED TO AND LOCATION UNIT IS ASIGNED TO
     *Parse documents.getelementbyid to int where it is Int in the database.//
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
            document.getElementById('locationName').value = '';
            setMainObject(defaultOb);
        }).catch((error) => {
            console.log(error);
        });
    }
    const delLocation = (e) => {
        e.preventDefault();
        const body = `{ "locationId" : ${parseInt(document.getElementById('delLocationSelect').value)}, "timePassedToSrv" : "${Date()}" }`;
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
        const body = `{ "unitName" : "${document.getElementById('unitName').value}", "locationId" : ${parseInt(document.getElementById('locationSelected').value)}, "timePassedToSrv" : "${Date()}" }`;
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
        const body = `{ "id" : ${parseInt(document.getElementById('delUnitId').value)}, "timePassedToSrv" : "${Date()}" }`;
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
            if (unit.id === parseInt(document.getElementById('unitSelectedCreateRoom').value)) {
                locationId = parseInt(unit.locationId);
            }
            return unit.id;
        });
        const body = `{ "roomName" : "${document.getElementById('roomName').value}", "currentTemp" : "100", "timePassedToSrv" : "${Date()}",
         "locationId" : ${locationId}, "unitId" : ${parseInt(document.getElementById('unitSelectedCreateRoom').value)} }`;
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
        const body = `{ "id" : ${parseInt(document.getElementById('delRoomId').value)}, "timePassedToSrv" : "${Date()}" }`;
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
                console.log("Error" + res.results);
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
                    {locationList.length > 0 ?
                        <>
                            <select id="delLocationSelect">
                                {
                                    locationList.map((loc, index) => (
                                        <option key={index} value={loc.id} >{loc.locName}</option>
                                    ))
                                }
                            </select>
                            <input type='submit' />
                        </> : "No Locations to delete."}
                </form>
            </div>
            <div>
                <h3>Units</h3>
                <form onSubmit={newunit}>
                    <label>Create Unit</label>
                    {locationList.length > 0 ?
                        <>
                            Add to location:
                            <select id="locationSelected">
                                {
                                    locationList.map((loc, index) => (
                                        <option key={index} value={loc.id} >{loc.locName}</option>
                                    ))
                                }
                            </select>
                            <br />
                            <input type='text' id="unitName" />
                            <input type='submit' />
                        </> : "A location needs to be created before you can add a unit."}
                </form>

                <form onSubmit={delUnit}>
                    <label>Delete Unit</label>
                    {unitList.length > 0 ?
                        <>
                            <select id="delUnitId">
                                {
                                    unitList.map((unit, index) => (
                                        <option key={index} value={unit.id}>{unit.unitName}</option>
                                    ))
                                }
                            </select>
                            <input type='submit' />
                        </> : "No units to delete"}
                </form>
            </div>
            <div>

                <h3>Rooms</h3>
                <form onSubmit={newroom}>
                    <label>Create Room</label>
                    {unitList.length > 0 ? <>Add room to Unit:
                        <select id="unitSelectedCreateRoom">
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
                    {roomList.length > 0 ?
                        <>
                            <select id="delRoomId">
                                {
                                    roomList.map((room, index) => (
                                        <option key={index} value={room.id}>{room.roomName}</option>
                                    ))
                                }
                            </select>
                            <input type='submit' />
                        </> : 'No Rooms to delete yet.'}
                </form>
            </div>

        </div>

    )
}
export default Settings