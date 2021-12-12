const Main = ({ backend, setMainObject, defaultOb, locationList, unitList, roomList }) => {
    ///PROBLEM IN CODE ROOM INFORMATION IS ALWAYS THE SAME.
    let mainArray = [];
    for (let i = 0; i < locationList.length; i++) {
        unitList.map((unit, index) => {
            if (unit.locationName === locationList[i].locName) {
                roomList.map((room, index) => {
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
                        mainArray.push(push)
                    }
                    return 1;
                })
            }
            return 1;
        });
    }
    console.log(mainArray);

    return (
        <div id="main">
            {/*
                unitList.map((unit, index) => (
                    <div>
                        <header>Unit Name: {unit.unitName} Controlroom: {unit.controlRoom} Desired Temperature: {unit.desiredTemp}</header>
                        <div>
                            Controls go here.
                        </div>
                    </div>
                ))




                */  }
        </div>
    )
}
export default Main;
