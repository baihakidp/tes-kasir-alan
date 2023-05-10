import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import React from "react";

interface DataType {
  name: string;
  image: string;
  price: string;
  number: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "#",
    dataIndex: "number",
    key: "number",
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
  },
  {
    title: "Harga",
    dataIndex: "price",
    key: "price",
  },
];

const data: DataType[] = [
  {
    name: "Ketoprak",
    image: "Ketoprak",
    price: "30000",
    number: "1",
  },
];

const Food: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col gap-3 mt-6 px-8">
        <div>Tambahkan menu makanan yang ada di resto</div>
        <div className="flex flex-col gap-6 border rounded border-gray-300 p-8 ">
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
