import Units from "./Units";
const Main = ({ backend, setMainObject, defaultOb, locationList, unitList, roomList }) => {
    ///PROBLEM IN CODE ROOM INFORMATION IS ALWAYS THE SAME.
    /*
    TODO change mainArray to roomArray and make a unitArray that will render the components 
    */
    let unitArray = [];
    let roomArray = [];
    for (let i = 0; i < locationList.length; i++) {
        unitList.map((unit) => {
            if (unit.locationId === locationList[i].id) {
                unitArray.push(unit);
                roomList.map((room) => {
                    if (room.unitId === unit.id) {
                        let push = {
                            locationId: locationList[i].id,
                            locationName: `${locationList[i].locName}`,
                            unitId: unit.id,
                            unitName: `${unit.unitName}`,
                            desiredTemp: unit.desiredTemp,
                            controlRoom: `${unit.controlRoom}`,
                            roomId: room.id,
                            roomName: `${room.roomName}`,
                            currentTemp: room.currentTemp,
                            updatedAt: `${room.updatedAt}`
                        }
                        roomArray.push(push)
                    }
                    return 1;
                })
            }
            return 1;
        });
    }
    console.log(unitArray);
    // console.log(roomArray);

    return (
        <div id="mainDiv">
            {
                unitArray.map((unit, index) => (
                    <Units key={index} unit={unit} roomList={roomList} />
                ))




            }
        </div>
    )
}
export default Main;
