import { Box } from "../../../components/box";
import { Events } from "./right-box-components/events";
import PastDetails from "./right-box-components/past-details";
import { SellGarbageUser } from "./user-components/sell-garbage";
import { WasteChart } from "./right-box-components/waste-chart";
import { SellGarbageDeliveryBoy } from "./delivery-boy-components/sell-garbage";
import { SellGarbageCompany } from "./company-components/purchase-garbage";

export function RightBox() {
  const sampleOrder = [
    {
      item: {
        name: "Item 1",
        price: 10.99,
        weight: 0.5,
        image:
          "https://5.imimg.com/data5/MB/QV/MY-9702965/small-size-jute-bags-500x500.jpg",
      },
      deliveryPerson: {
        name: "John Doe",
        photo:
          "https://img.freepik.com/premium-psd/portrait-young-pizza-delivery-boy_1162740-29585.jpg",
        contact: "+1 (555) 123-4567",
        rating: 4.5,
      },
      pickupTime: {
        start: "3:00 PM",
        end: "3:30 PM",
      },
    },
    {
      item: {
        name: "Item 1",
        price: 10.99,
        weight: 0.5,
        image:
          "https://5.imimg.com/data5/MB/QV/MY-9702965/small-size-jute-bags-500x500.jpg",
      },
      deliveryPerson: {
        name: "John Doe",
        photo:
          "https://img.freepik.com/premium-psd/portrait-young-pizza-delivery-boy_1162740-29585.jpg",
        contact: "+1 (555) 123-4567",
        rating: 4.5,
      },
      pickupTime: {
        start: "3:00 PM",
        end: "3:30 PM",
      },
    },
    {
      item: {
        name: "Item 1",
        price: 10.99,
        weight: 0.5,
        image:
          "https://5.imimg.com/data5/MB/QV/MY-9702965/small-size-jute-bags-500x500.jpg",
      },
      deliveryPerson: {
        name: "John Doe",
        photo:
          "https://img.freepik.com/premium-psd/portrait-young-pizza-delivery-boy_1162740-29585.jpg",
        contact: "+1 (555) 123-4567",
        rating: 4.5,
      },
      pickupTime: {
        start: "3:00 PM",
        end: "3:30 PM",
      },
    },
    {
      item: {
        name: "Item 1",
        price: 10.99,
        weight: 0.5,
        image:
          "https://5.imimg.com/data5/MB/QV/MY-9702965/small-size-jute-bags-500x500.jpg",
      },
      deliveryPerson: {
        name: "John Doe",
        photo:
          "https://img.freepik.com/premium-psd/portrait-young-pizza-delivery-boy_1162740-29585.jpg",
        contact: "+1 (555) 123-4567",
        rating: 4.5,
      },
      pickupTime: {
        start: "3:00 PM",
        end: "3:30 PM",
      },
    },
    {
      item: {
        name: "Item 1",
        price: 10.99,
        weight: 0.5,
        image:
          "https://5.imimg.com/data5/MB/QV/MY-9702965/small-size-jute-bags-500x500.jpg",
      },
      deliveryPerson: {
        name: "John Doe",
        photo:
          "https://img.freepik.com/premium-psd/portrait-young-pizza-delivery-boy_1162740-29585.jpg",
        contact: "+1 (555) 123-4567",
        rating: 4.5,
      },
      pickupTime: {
        start: "3:00 PM",
        end: "3:30 PM",
      },
    },
  ];

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
          {type.length==2 && <SellGarbageUser />}
          {type.length==1 && <SellGarbageDeliveryBoy />}
          {type.length==1 && <SellGarbageCompany />}
        </Box>
      </div>
      <Box className="flex-grow bg-green-50 overflow-scroll no-scrollbar max-h-[504px]">
        <PastDetails orders={sampleOrder} />
      </Box>
    </div>
  );
}
