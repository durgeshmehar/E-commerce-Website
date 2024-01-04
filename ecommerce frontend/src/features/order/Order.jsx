import React,{ useState } from "react";
import { useSelector , useDispatch } from "react-redux";
import {selectOrders } from "./OrdererSlice";

export default function Order() {
    const Order = useSelector(selectOrders);
    const dispatch = useDispatch();

    return (
        <>

        </>
    );
}
