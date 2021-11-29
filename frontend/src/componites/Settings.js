const Settings = ({ mainObject, backend }) => {
    let locationList = [];
    for (let i = 0; i < mainObject[0].length; i++) {
        locationList.push(mainObject[0][i]);
    }
    //[0]== LOCATIONS
    //[1] == units
    //[2] == rooms
    const newLocation = (e) => {
        e.preventDefault();
        const body = `{ "locationName" : "${document.getElementById('locationName').value}", "timePassedToSrv" : "${Date()}" }`;
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
            console.log(res.results);
        }).catch((error) => {
            console.log(error);
        });
    }
    const delLocation = (e) => {
        e.preventDefault();

    }
    const newunit = (e) => {
        e.preventDefault();
        const body = `{ "unitName" : "${document.getElementById('unitName').value}", "timePassedToSrv" : "${Date()}" }`;
        fetch(`${backend}/createunit`, {
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
                    <select>
                        
                        {
                        locationList.map((loc, index) => (
                            <option key={index} value={loc.id}>{loc.locName}</option>
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
                    <input type='text' id="unitName" />
                    <input type='submit' />
                </form>
                <form onSubmit={delUnit}>
                    <label>Delete Unit</label>
                    <select>
                        <option>placeholder</option>
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
                    <select>
                        <option>placeholder</option>
                    </select>
                    <input type='submit' />
                </form>
            </div>

        </div>

    )
}
export default Settings