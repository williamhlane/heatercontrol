
const Settings = ({ backend, setMainObject, defaultOb, locationList, unitList, roomList }) => {
    const fetchFunction = async (infoArray) => {
        //array['method', 'url', 'body'];
        await fetch(`${backend}${infoArray[1]}`, {
            method: `${infoArray[0]}`,
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: `${infoArray[2]}`,
        }).then((res) => {
            return res.json();
        }).then((res) => {
            if (res.results === "Completed") {
                alert("Task was completed");
            } else {
                alert(`Error: ${res.error}`);
            }
            setMainObject(defaultOb);
        }).catch((error) => {
            alert(`Error: ${error.results}`)
        });
    }
    const newLocation = (e) => {
        e.preventDefault();
        const body = `{ "locName" : "${document.getElementById('locationName').value}", "timePassedToSrv" : "${Date()}" }`;
        fetchFunction(['POST', '/location', `${body}`]);
        document.getElementById('locationName').value = '';

    }
    const delLocation = (e) => {
        e.preventDefault();
        const body = `{ "locationId" : ${parseInt(document.getElementById('delLocationSelect').value)}, "timePassedToSrv" : "${Date()}" }`;
        fetchFunction(['DELETE', '/location', `${body}`]);
    }
    const newunit = (e) => {
        e.preventDefault();
        const body = `{ "unitName" : "${document.getElementById('unitName').value}", "locationId" : ${parseInt(document.getElementById('locationSelected').value)}, "timePassedToSrv" : "${Date()}" }`;
        fetchFunction(['POST', '/units', `${body}`]);
        document.getElementById('unitName').value = '';
    }
    const delUnit = (e) => {
        e.preventDefault();
        const body = `{ "id" : ${parseInt(document.getElementById('delUnitId').value)}, "timePassedToSrv" : "${Date()}" }`;
        fetchFunction(['DELETE', '/units', `${body}`]);
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
        const body = `{ "roomName" : "${document.getElementById('roomName').value}", "currentTemp" : 100, "timePassedToSrv" : "${Date()}",
         "locationId" : ${locationId}, "unitId" : ${parseInt(document.getElementById('unitSelectedCreateRoom').value)} }`;
        document.getElementById('roomName').value = '';
        fetchFunction(['POST', '/rooms', `${body}`]);
    }
    const delRoom = (e) => {
        e.preventDefault();
        const body = `{ "id" : ${parseInt(document.getElementById('delRoomId').value)}, "timePassedToSrv" : "${Date()}" }`;
        fetchFunction(['DELETE', '/rooms', `${body}`]);
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
                <label>Unit List</label>
                <ul>
                    {
                        unitList.map((unit, index) => (
                            <li key={index}>{unit.unitName} at {unit.locationName}</li>
                        ))
                    }
                </ul>
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
                <ul>
                    {
                        roomList.map((room, index) => (
                            <li key={index}>{room.roomName} assigned to {room.unitName} at {room.locationName}</li>
                        ))
                    }
                </ul>

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