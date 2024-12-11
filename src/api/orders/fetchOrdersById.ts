// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../utils/firebase";
// import { orderWithId, setOrders } from "@/redux/orderSlice";

// export const fetchOrdersById = async (userId: string, dispatch: any): Promise<void> => {
//   try {
//     const ordersCollection = collection(db, "orders");
//     const querySnapshot = await getDocs(ordersCollection);

//     const filteredOrders: orderWithId[] = querySnapshot.docs
//       .map((doc) => {
//         const data = doc.data().order;
//         return {
//           id: doc.id,
//           chatId: data.chatId ?? "",
//           status: data.status ?? "pending",
//           order: {
//             seller: {
//               id: data.seller?.id ?? "",
//               name: data.seller?.name,
//               image: data.seller?.image,
//               phone: data.seller?.phone,
//               address: data.seller?.address,
//             },
//             company: {
//               id: data.company?.id ?? "",
//               name: data.company?.name,
//               image: data.company?.image,
//               phone: data.company?.phone,
//               address: data.company?.address,
//             },
//             item: {
//               id: data.item?.id ?? "",
//               name: data.item?.name,
//               price: data.item?.price,
//               weight: data.item?.weight,
//               image: data.item?.image,
//               category: data.item?.category,
//             },
//             deliveryPerson: {
//               id: data.deliveryPerson?.id ?? "",
//               name: data.deliveryPerson?.name,
//               photo: data.deliveryPerson?.photo,
//               contact: data.deliveryPerson?.contact,
//               rating: data.deliveryPerson?.rating,
//             },
//             pickupTime: {
//               start: data.pickupTime?.start,
//               end: data.pickupTime?.end,
//             },
//           },
//         };
//       })
//       .filter(
//         (order) =>
//           (order.order.seller?.id === userId ||
//             order.order.company?.id === userId ||
//             order.order.deliveryPerson?.id === userId) &&
//           order.status === "assigned" 
//       )
//       .sort((a, b) => {
//         const startTimeA = new Date(a.order.pickupTime?.start || "").getTime();
//         const startTimeB = new Date(b.order.pickupTime?.start || "").getTime();
//         return startTimeB - startTimeA;
//       });

//     dispatch(setOrders(filteredOrders));
//     console.log(filteredOrders);
//   }
//   catch(error){
//     console.error("Error fetching orders: ", error);
//     throw new Error("Failed to fetch orders");
//   }
// };


import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { orderWithId, setOrders } from "@/redux/orderSlice";

export const fetchOrdersById = async (userId: string, dispatch: any): Promise<void> => {
  try {
    const ordersCollection = collection(db, "orders");
    const querySnapshot = await getDocs(ordersCollection);

    const filteredOrders: orderWithId[] = querySnapshot.docs
      .map((doc) => {
        const data = doc.data().order;
        // console.log(data);
        
        return {
          id: doc.id,
          chatId: data.chatId ?? "",
          order: {
            seller: {
              id: data.seller?.id ?? "",
              name: data.seller?.name,
              image: data.seller?.image,
              phone: data.seller?.phone.value,
              address: data.seller?.address.city,
            },
            company: {
              id: data.company?.id ?? "",
              name: data.company?.name,
              image: data.company?.image,
              phone: data.company?.phone,
              address: data.company?.address ?? "NA",
            },
            itemName: data.itemName,
            status: data.status || "pending",
            weight: data.weight,
            image: data.image,
            deliveryPerson: {
              id: data.deliveryPerson?.id ?? "",
              name: data.deliveryPerson?.name,
              image: data.deliveryPerson?.image,
              phone: data.deliveryPerson?.phone,
              rating: data.deliveryPerson?.rating,
            },
            pickupTime: {
              start: data.pickupTime?.start,
              end: data.pickupTime?.end,
            },
          },
        };
      })
      .filter(
        (order) =>
          (order.order.seller?.id === userId ||
            order.order.company?.id === userId ||
            order.order.deliveryPerson?.id === userId) &&
          order.order.status === "assigned" 
      )
      .sort((a, b) => {
        const startTimeA = new Date(a.order.pickupTime?.start || "").getTime();
        const startTimeB = new Date(b.order.pickupTime?.start || "").getTime();
        return startTimeB - startTimeA;
      });

    dispatch(setOrders(filteredOrders));
    console.log(filteredOrders);
  }
  catch(error){
    console.error("Error fetching orders: ", error);
    throw new Error("Failed to fetch orders");
  }
};

