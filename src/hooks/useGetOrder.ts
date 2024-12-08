import { fetchOrdersBySellerId } from "@/api/orders/fetchOrdersBySellerId";
import { useAppSelector } from "@/redux/hooks";
import { orderWithId } from "@/redux/orderSlice";
import { Order } from "@/types/order";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export function useGetOrder(userId: string, orderId: string) {
    const order = useAppSelector((state) => state.order.order);
    const [ord, setOrd] = useState<orderWithId | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!order){
            fetchOrdersBySellerId(userId, dispatch);
        }
        const foundOrder = order.find((ord) => ord.id === orderId);
        if(foundOrder){
            setOrd(foundOrder);
        }
    }, [order]);

    return {ord};
}