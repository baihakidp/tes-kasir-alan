import React, { useEffect, useState } from "react";
import axios from "axios";
import People from "../../public/people.png";
import Image from "next/image";
import { Input, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/router";

interface DataType {
  name: string;
  image: string;
  price: string;
  number: string;
  id: string;
}

interface OrdersType {
  name: string;
  image: string;
  price: string;
  number: string;
  id: string;
  count: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Nama",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Foto",
    dataIndex: "image",
    key: "image",
    render: (e) => {
      return (
        <Image
          src={e}
          alt="gambar"
          fill
          className="object-cover max-w-[80px] max-h-[60px]"
        />
      );
    },
  },
  {
    title: "Harga",
    dataIndex: "price",
    key: "price",
  },
];

const Transaction = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [orders, setOrders] = useState<OrdersType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [price, setPrice] = useState("");

  const showModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const getFood = async () => {
    const getData = await axios.get("/api/food");
    setData(getData.data);
  };

  useEffect(() => {
    getFood();
  }, []);

  const TotalPrice = orders.reduce((acc, food) => {
    const price = parseInt(food.price, 10);
    return acc + food.count * price;
  }, 0);
  const CustomerPrice = parseInt(price);

  const ReturnCustomer = CustomerPrice - TotalPrice;

  return (
    <div className="flex gap-4 ">
      <div className="grid grid-cols-3 gap-4 mt-8 w-[70%] ">
        {data.map((food) => (
          <button
            key={food.id}
            onClick={() => {
              setOrders((prevOrders) => {
                const findOrderIndex = prevOrders.findIndex((order) => {
                  return order.id === food.id;
                });
                if (findOrderIndex === -1) {
                  const payload = { ...food, count: 1 };
                  return [...prevOrders, payload];
                }

                if (findOrderIndex !== -1) {
                  const clone = [...prevOrders];
                  clone[findOrderIndex].count = clone[findOrderIndex].count + 1;
                  return [...clone];
                }

                return prevOrders;
              });
            }}
          >
            <div className="h-[300px] w-[230px] rounded-lg overflow-hidden border shadow-md flex flex-col justify-between bg-white">
              <Image
                alt="foto"
                src={food.image}
                className=" h-[200px] object-cover"
                width={230}
                height={200}
              />
              <div className="font-semibold flex flex-col justify-center items-center pb-8  mb-1">
                <p>{food.name}</p>
                <p className="text-cyan-400">Rp. {food.price}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4 border mt-8 p-4 w-[30%] h-[70%] shadow-md bg-white ">
        <div className="flex items-center gap-3 justify-center">
          <Image
            src={People}
            alt="icon"
            className="border rounded-full border-black"
          />
          <p className="font-bold text-[24px]">Pesanan</p>
        </div>
        <div className=" p-2 h-auto">
          {orders.map((order) => {
            return (
              <div key={order.id}>
                <div className="flex justify-between p-2 items-center">
                  <div className="flex flex-row gap-4 items-center">
                    <Image
                      alt="foto"
                      src={order.image}
                      className=" h-[80px] w-[80px] object-cover"
                      width={230}
                      height={200}
                    />
                    <p> {order.name}</p>
                  </div>
                  <div className="flex gap-4">
                    <p>x {order.count}</p>
                    <p className="text-cyan-500 font-semibold">
                      Rp. {order.price}
                    </p>
                  </div>
                </div>
                <br />
              </div>
            );
          })}
        </div>
        <button
          onClick={() => {
            setOrders([]);
          }}
          className="border px-8 border-red-500 text-red-500 py-1"
        >
          Clear Cart
        </button>
        <div className="flex gap-4 justify-between">
          <button
            onClick={() => {
              toast.success("Berhasil Disimpan");
            }}
            className="border px-8 py-1 w-[50%] bg-green-700/70 text-white font-semibold"
          >
            Save Bill
          </button>
          <button
            onClick={() => {
              window.print();
            }}
            className="border px-8 py-1 w-[50%] bg-green-700/70 text-white font-semibold"
          >
            Print Bill
          </button>
        </div>

        <button
          onClick={showModal}
          className="py-2 items-center border px-16 bg-blue-500 text-white font-semibold "
        >
          Charge Rp. {TotalPrice.toLocaleString()}
        </button>
      </div>
      <Modal
        title="Detail Pesanan"
        open={isModalOpen}
        width={1280}
        footer
        closable={false}
      >
        <div className="flex gap-8">
          <Table columns={columns} dataSource={orders} className="w-[80%]" />
          <div className="border"></div>
          <div className="w-[20%] flex flex-col gap-4">
            <h1>Uang Pembeli</h1>
            <Input
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <div className="flex gap-4 justify-between">
              <button
                onClick={showModal}
                className="border px-4 py-1 w-[50%]  text-neutral-400 font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  if (CustomerPrice > TotalPrice) {
                    toast.success("Pembayar berhasil");
                    showModal();
                  }
                  if (CustomerPrice < TotalPrice) {
                    toast.error("Uang anda kurang");
                  }
                }}
                className="border px-4 py-1 w-[50%] bg-blue-500 text-white font-semibold"
              >
                Pay!
              </button>
            </div>
            <p className="font-semi-bold text-red-500 text-lg">
              {(CustomerPrice &&
                TotalPrice &&
                (CustomerPrice < TotalPrice ? (
                  <div>Uang Tidak Cukup</div>
                ) : (
                  <div>Kembalian: Rp. {ReturnCustomer.toLocaleString()}</div>
                ))) || <div>Silahkan Masukkan Uang</div>}
            </p>
          </div>
        </div>
      </Modal>
      <Toaster />
    </div>
  );
};

export default Transaction;
