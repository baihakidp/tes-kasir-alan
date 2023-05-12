import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface DataType {
  name: string;
  image: string;
  price: string;
  number: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
  },
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

const Food: React.FC = () => {
  const [data, setData] = useState([]);

  const getFood = async () => {
    const getData = await axios.get("/api/food");
    setData(getData.data);
  };

  useEffect(() => {
    getFood();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-3 mt-6 px-8">
        <div className="text-gray-400">
          Tambahkan menu makanan yang ada di resto
        </div>
        <div className="flex flex-col gap-6 border rounded border-gray-300 p-8 bg-white">
          <Link
            href={"/addfood"}
            className="text-white py-2 px-3 rounded bg-blue-500 w-[140px]"
          >
            + Tambah Menu
          </Link>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </div>
  );
};

export default Food;
