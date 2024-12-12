import PaperRecyclingProcess from "./components/process/PaperRecyclingProcess"
import PlasticRecyclingProcess from "./components/process/PlasticRecyclingProcess";
import ElectricWasteRecycling from "./components/process/ElectricWasteRecycling";

const Data = () => {
    return(
        <>
        <PaperRecyclingProcess/>
        <PlasticRecyclingProcess/>
        <ElectricWasteRecycling/>
        </>
    )
}

export default Data;