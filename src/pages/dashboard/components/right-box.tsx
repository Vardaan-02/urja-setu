import { Box } from "../../../components/box";
import { Events } from "./right-box-components/events";
import PastDetails from "./right-box-components/past-details";
import { SellGarbageUser } from "./user-components/sell-garbage";
import { WasteChart } from "./right-box-components/waste-chart";
import { SellGarbageDeliveryBoy } from "./delivery-boy-components/sell-garbage";
import { SellGarbageCompany } from "./company-components/purchase-garbage";
import { useIsAuthorized } from "@/hooks/useIsAuthorized";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { fetchOrdersByDelivery } from "@/api/orders/fetchOrderByDelivery";
import { fetchOrdersById } from "@/api/orders/fetchOrdersById";

export function RightBox() {
  const auth = useIsAuthorized();
  const dispatch = useDispatch();
  const orders = useAppSelector(state => (state.order.order));
  useEffect(() => {
    if(auth?.auth?.uid){    
      console.log(auth); 
      // if(auth.auth.role == "DeliveryPerson"){
      //   fetchOrdersByDelivery(auth.auth.uid, dispatch);
      // }   
      // else{
        fetchOrdersById(auth.auth.uid, dispatch);
      // }
    }
  }, [])

  const type = ['type','type'];

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 flex-grow">
        <Box className="bg-green-50 flex-1 aspect-square">
          <Events />
        </Box>
        <Box className="bg-green-50 flex-1 aspect-square">
          <WasteChart />
        </Box>
        <Box className="bg-green-50 flex-1 aspect-square">
          {auth.auth.role==="User" && <SellGarbageUser />}
          {auth.auth.role==="DeliveryPerson" && <SellGarbageDeliveryBoy />}
          {auth.auth.role==="Organization" && <SellGarbageCompany />}
        </Box>
      </div>
      <Box className="flex-grow bg-green-50 overflow-scroll no-scrollbar max-h-[504px]">
        <PastDetails orders={orders} />
      </Box>
    </div>
  );
}
