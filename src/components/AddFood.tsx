import React from "react";
import { Input, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info: any) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e: any) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const AddFood = () => {
  return (
    <div>
      <div className="flex flex-col gap-3 mt-6 px-8">
        <div className="flex flex-col gap-6 border rounded border-gray-300 p-8 ">
          <h1 className="font-bold text-cyan-400">Tambahkan Menu</h1>
          <div className="flex flex-col gap-6">
            <div>
              Nama Menu
              <Input />
            </div>
            <div>
              Nama Menu
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-hint">
                  drag and drop file here or click
                </p>
              </Dragger>
            </div>
            <div>
              Nama Menu
              <Input />
            </div>
          </div>
          <div className="flex justify-end">
            <button className="text-white py-2 px-3 rounded bg-green-700/50 hover:bg-green-700 transition duration-200 w-[180px] items-end">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
