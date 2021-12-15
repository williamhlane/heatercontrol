import Units from "./Units";
const Main = ({ backend, setMainObject, defaultOb, locationList, unitList, roomList }) => {
    ///PROBLEM IN CODE ROOM INFORMATION IS ALWAYS THE SAME.
    /*
    TODO change mainArray to roomArray and make a unitArray that will render the components 
    */
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
