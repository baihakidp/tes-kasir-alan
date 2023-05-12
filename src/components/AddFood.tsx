import React, { useState } from "react";
import { Form, Input } from "antd";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/router";
import Image from "next/image";

const AddFood = () => {
  const [form] = Form.useForm();
  const [getUrl, setGetUrl] = useState("");
  const router = useRouter();

  return (
    <div>
      <div className="flex flex-col gap-3 mt-6 px-8">
        <div className="flex flex-col gap-6 border rounded border-gray-300 p-8 bg-white ">
          <h1 className="font-bold text-cyan-400">Tambahkan Menu</h1>
          <Form
            form={form}
            className="flex flex-col gap-6"
            onFinish={async (value) => {
              try {
                const payload = {
                  name: value.name,
                  image: getUrl,
                  price: value.price,
                };
                await axios.post("/api/food", payload);
                router.push("/food");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <label>
              <p>Nama Menu</p>
              <Form.Item
                name={"name"}
                rules={[{ required: true, message: "Nama Diperlukan" }]}
              >
                <Input />
              </Form.Item>
            </label>
            <label>
              <p>Nama Menu</p>
              <CldUploadWidget
                uploadPreset="htxetpna"
                onUpload={(res: any) => {
                  setGetUrl(res.info.secure_url);
                }}
              >
                {({ open }) => {
                  return (
                    <div
                      onClick={() => open?.()}
                      className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
                    >
                      <div className="font-semibold text-lg">
                        Click to upload
                      </div>
                      {getUrl && (
                        <div className="absolute inset-0 w-full h-full">
                          <Image
                            alt="Upload"
                            fill
                            style={{ objectFit: "cover" }}
                            src={getUrl}
                          />
                        </div>
                      )}
                    </div>
                  );
                }}
              </CldUploadWidget>
            </label>

            <label>
              <p>Nama Menu</p>
              <Form.Item
                name={"price"}
                rules={[{ required: true, message: "Harga Diperlukan" }]}
              >
                <Input prefix={<div className=" font-semibold">Rp.</div>} />
              </Form.Item>
            </label>
            <div className="flex justify-end">
              <button className="text-white py-2 px-3 rounded bg-green-700/50 hover:bg-green-700 transition duration-200 w-[180px] items-end">
                Simpan
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
