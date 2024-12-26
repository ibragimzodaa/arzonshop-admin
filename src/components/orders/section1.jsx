import React from "react";
import { Button } from "../ui/button";
import { primary } from "../theme/theme";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const OrdersPage = () => {
  const orders = [
    { id: "#12521B", date: "May 5, 4:20 PM", customer: "Tom Anderson", paymentStatus: "Paid", orderStatus: "Ready", total: "$49.90" },
    { id: "#12523C", date: "May 5, 4:15 PM", customer: "Jayden Walker", paymentStatus: "Paid", orderStatus: "Ready", total: "$34.36" },
    { id: "#51232A", date: "May 5, 4:15 PM", customer: "Inez Kim", paymentStatus: "Paid", orderStatus: "Ready", total: "$5.51" },
    { id: "#23534D", date: "May 5, 4:12 PM", customer: "Francisco Henry", paymentStatus: "Paid", orderStatus: "Shipped", total: "$29.74" },
    { id: "#51323C", date: "May 5, 4:12 PM", customer: "Violet Phillips", paymentStatus: "Paid", orderStatus: "Shipped", total: "$23.06" },
    { id: "#35622A", date: "May 5, 4:12 PM", customer: "Rosetta Becker", paymentStatus: "Paid", orderStatus: "Shipped", total: "$87.44" },
    { id: "#34323D", date: "May 5, 4:10 PM", customer: "Dean Love", paymentStatus: "Paid", orderStatus: "Ready", total: "$44.55" },
  ];

  return (
    <div className="p-[50px]">
      <div className="flex justify-between">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <Button  style={{backgroundColor: primary}}>+ Add order</Button>
      </div>
      <div className="flex w-[400px] mb-[40px] justify-between">
        <Input placeholder="Search..." className="w-[200px]"/>
        <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-[1200px] border-collapse border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 border-b border-gray-200 text-left">Order</th>
              <th className="p-4 border-b border-gray-200 text-left">Date</th>
              <th className="p-4 border-b border-gray-200 text-left">Customer</th>
              <th className="p-4 border-b border-gray-200 text-left">Payment Status</th>
              <th className="p-4 border-b border-gray-200 text-left">Order Status</th>
              <th className="p-4 border-b border-gray-200 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-4 border-b border-gray-200">{order.id}</td>
                <td className="p-4 border-b border-gray-200">{order.date}</td>
                <td className="p-4 border-b border-gray-200">{order.customer}</td>
                <td className="p-4 border-b border-gray-200">
                  <span
                    className={`px-2 py-1 rounded-lg ${
                      order.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="p-4 border-b border-gray-200">
                  <span
                    className={`px-2 py-1 rounded-lg ${
                      order.orderStatus === "Ready"
                        ? "bg-orange-100 text-orange-700"
                        : order.orderStatus === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td className="p-4 border-b border-gray-200">{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
