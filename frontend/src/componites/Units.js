const Units = ({ unit, roomList }) => {
/*unit {id, unitName, locationId, desiredTemp, controlRoom, locationName}*/
    const setControlRoom = (roomId) => {
        console.log(unit.id + roomId);
    }
    const changeTemp = (inputTemp) => {
        console.log(unit.id + inputTemp);
    }

    /**************************************************************************** */
    const TempSwipe = () => {
        let swipeNum = [];
        for(let temp = 32; temp < 90; temp++){
            swipeNum.push(<span key={temp} className="swipeNum" onClick={(e) => changeTemp(e.target.value)}> {temp} </span>)
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
            <select onChange={(e) => setControlRoom(e.target.value)}>
            {
                roomList.map((room, index) => (
                   room.unitId === unit.id ? <option key={index}>{room.roomName}</option> : null 
                ))
            }
            </select>
            {<TempSwipe />}
        </div>
    )
}
export default Units;