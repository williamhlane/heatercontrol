import Units from "./Units";
const Main = ({ backend, setMainObject, defaultOb, locationList, unitList, roomList }) => {
    let unitArray = [];
     for (let i = 0; i < locationList.length; i++) {
        unitList.map((unit) => {
            if (unit.locationId === locationList[i].id) {
                unitArray.push(unit);
            }
            return 1;
        });
    }
    return (
        <div id="mainDiv">
            {
                unitArray.map((unit, index) => (
                    <Units key={index} unit={unit} roomList={roomList} setMainObject={setMainObject} defaultOb={defaultOb} backend={backend}/>
                ))
            }
        </div>
    )
}
export default Main;
