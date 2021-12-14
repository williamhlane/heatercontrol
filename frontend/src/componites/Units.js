const Units = ({ unit, roomList, setMainObject, defaultOb }) => {
    const fetchFunction = (roomId, unitId, dowhat) => {
        //(roomId, unit.id , dowhat)//
        ////NEED TO CREATE THE ROUTES use unitinstructions post ON THE BACK END AND DO THE FETCH//USE SWITCH
        setMainObject(defaultOb);
    }
    /**************************************************************************** */
    const TempSwipe = () => {
        let swipeNum = [<span key='0' className="swipeNum" onClick={() => fetchFunction(parseInt(0), unit.id, "changeTemp")}> OFF </span>];
        for(let temp = 40; temp < 90; temp++){//In the furture put css directly and slowly change from blue to red as the numbers get higher.
            swipeNum.push(<span key={temp} className="swipeNum" onClick={() => fetchFunction(parseInt(temp), unit.id, "changeTemp")}> {temp} </span>)
        }
        return (
            <div className="tempSwipe">
                {swipeNum}
            </div>
        )
    }
    /*************************************************************************** */
    return(
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
            {unit.desiredTemp !== 0 ? <label>Desired Temperature: {unit.desiredTemp} </label> : <label>Heater is off.</label> }
            {<TempSwipe />}
        </div>
    )
}
export default Units;