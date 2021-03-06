const Units = ({ unit, roomList, setMainObject, defaultOb, backend, index }) => {
    const fetchFunction = (roomIdorTemp, unitId, doWhat) => {
        fetch(`${backend}/unitinstructions`, {
            method: `POST`,
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: `{ "roomIdorTemp" : ${roomIdorTemp}, "unitId" : ${parseInt(unitId)}, "doWhat" : "${doWhat}" }`,
        }).then((res) => {
            return res.json();
        }).then((res) => {
            if (res.results !== "Completed") {
                alert(`${res.results}`);
            }
            setMainObject(defaultOb);
        }).catch((error) => {
            alert(`Error: ${error.results}`)
        });
    }
    const TempSwipe = () => {
        let swipeNum = [<span key='0' className="swipeNum" onClick={() => fetchFunction(parseInt(0), unit.id, "changeTemp")}> OFF </span>];
        for (let temp = 40; temp < 90; temp++) {//In the furture put css directly and slowly change from blue to red as the numbers get higher.
            swipeNum.push(<span key={temp} className="swipeNum" onClick={() => fetchFunction(parseInt(temp), unit.id, "changeTemp")}> {temp} </span>)
        }
        return (
            <div className="tempSwipe">
                {swipeNum}
            </div>
        )
    }
   
    const update = () => {
        setTimeout(async () => {
            await fetch(`${backend}/mainobject`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((responce) => {
                return responce.json();
            }).then((responce) => {
                for (let i = 0; i < responce[2].length; i++) {
                    if (parseInt(responce[2][i].id) === parseInt(unit.controlRoomId)) {
                        if (document.getElementById(index) !== null) {
                            document.getElementById(index).innerText = "Current Temp: " + responce[2][i].currentTemp;
                        }
                    }
                }
            }).catch((error) => {
                console.log(error);
            });
            update();
        }, 60000);
    }
    update();
    let currentTemp;
    roomList.map((room) => {
        if (parseInt(room.id) === parseInt(unit.controlRoomId)) {
            currentTemp = room.currentTemp;
        }
        return 0;
    });
    return (
        <div className="unitsDiv">
            <h2>{unit.unitName}</h2> <h3>Location: {unit.locationName}</h3>
            <label>Select Control Room:</label>
            <select onChange={(e) => fetchFunction(e.target.value, unit.id, "setControlRoom")}>
                <option key={10000}>{unit.controlRoom}</option>{/*NO VALUE?*/}
                {
                    roomList.map((room, index) => (
                        room.locationId === unit.locationId ? <option key={index} value={room.id}>{room.roomName}</option> : null
                    ))
                }
            </select>
            {unit.desiredTemp !== 0 ? <><label>Desired Temperature: {unit.desiredTemp} </label><label id={index}>Current Temp: {currentTemp}</label></> : <label>Heater is off.</label>}
            <TempSwipe />
        </div>
    )

}


export default Units;