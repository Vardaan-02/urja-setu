import PaperRecyclingProcess from "./components/process/PaperRecyclingProcess"
import PlasticRecyclingProcess from "./components/process/PlasticRecyclingProcess";
import ElectricWasteRecycling from "./components/process/E-WasteRecyclingProcess";
import MetalRecyclingDemo from "./components/process/MetalRecyclingDemo";

const Data = () => {
    return(
        <div className="bg-emerald-100 dark:bg-emerald-700/[0.2]">
        <PaperRecyclingProcess/>
        <PlasticRecyclingProcess/>
        <ElectricWasteRecycling/>
        <MetalRecyclingDemo/>
        </div>
    )
}

export default Data;