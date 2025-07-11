// import axios from "axios";
import React, { useEffect, useState } from "react";
import data from "../assets/data.json";

function CRUD() {
  const [productData, setProductData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("beauty");
  const [image, setImage] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditID] = useState("");

  const loadProductData = async () => {
    try {
      //   const response = await axios.get("url");
      //   if (response.data.success) {
      //     setProductData(response.data.data);
      //   }
      if (data) {
        setProductData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitHandler = async (e) => {
    if (e) e.preventDefault();
    try {
      const newId =
        productData.length > 0
          ? Math.max(
              ...productData.map((item) =>
                item.id !== undefined ? item.id : 0
              )
            ) + 1
          : 1;

      let thumbnailUrl = "";
      if (image) {
        thumbnailUrl = URL.createObjectURL(image);
      }

      setProductData((prev) => [
        ...prev,
        {
          id: newId,
          title,
          description,
          price: Number(price),
          category,
          thumbnail: thumbnailUrl,
        },
      ]);
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("beauty");
      setImage(null);
      setShowAdd(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      setProductData(productData.filter((item) => item.id != id));
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = async (e) => {
    if (e) e.preventDefault();
    try {
      let thumbnailUrl = "";
      if (image && typeof image !== "string") {
        thumbnailUrl = URL.createObjectURL(image);
      } else if (typeof image === "string") {
        thumbnailUrl = image;
      }
      setProductData(
        productData.map((item) =>
          item.id === editId
            ? {
                ...item,
                title,
                description,
                category,
                price: Number(price),
                thumbnail: thumbnailUrl,
              }
            : item
        )
      );
      setTitle("");
      setCategory("beauty");
      setDescription("");
      setPrice("");
      setImage(null);
      setShowEdit(false);
      setEditID("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProductData();
  }, []);

  return (
    <div className="w-full h-full ">
      {showEdit || showAdd ? (
        <div className="absolute top-0 w-full h-full z-50 bg-[#00000060] flex items-center justify-center ">
          <div className="w-1/4 h-1/2 bg-white rounded-xl p-4 flex flex-col justify-center ">
            <form
              onSubmit={showAdd ? onSubmitHandler : editHandler}
              className="flex flex-col items-start gap-5 w-full text-black"
            >
              <div className="flex items-center gap-3">
                <p className="font-medium">Enter Title</p>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="p-2 outline-none bg-gray-300 rounded-xl text-gray-600 "
                  type="text"
                  placeholder="Title"
                  required
                />
              </div>
              <div className="flex items-center gap-3 w-full">
                <p className="font-medium">Enter Description</p>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="p-2 outline-none bg-gray-300 rounded-xl text-gray-600 w-full resize-none "
                  type="text"
                  placeholder="description..."
                  rows={3}
                  required
                />
              </div>
              <div className="flex items-center gap-3">
                <p className="font-medium">Enter Price</p>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="p-2 outline-none bg-gray-300 rounded-xl text-gray-600 "
                  type="number"
                  placeholder="$ 10.99"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="flex items-center gap-3">
                <p className="font-medium">Select Category</p>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="p-2 outline-none bg-gray-300 rounded-xl text-gray-600 "
                  required
                >
                  <option value="beauty">Beauty</option>
                  <option value="electronic">Electronic</option>
                  <option value="health">Health</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-medium">Select Image</p>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  className="p-2 outline-none bg-gray-300 rounded-xl text-gray-600 "
                  type="file"
                  accept="image/*"
                  required={showAdd}
                />
              </div>
              <div className="flex items-center justify-between w-full">
                <button
                  type="button"
                  onClick={() => {
                    if (showEdit) {
                      setShowEdit(false);
                      setTitle("");
                      setCategory("beauty");
                      setDescription("");
                      setPrice("");
                      setImage(null);
                      setEditID("");
                    } else if (showAdd) {
                      setShowAdd(false);
                      setTitle("");
                      setCategory("beauty");
                      setDescription("");
                      setPrice("");
                      setImage(null);
                    }
                  }}
                  className="bg-red-400 text-white px-3 py-1 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-400 text-white px-3 py-1 rounded-lg cursor-pointer"
                >
                  {showEdit ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <div className="p-8 flex flex-col justify-start gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-[25px] font-semibold ">Fetching data</h1>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-green-400 text-white px-5 py-2 rounded-lg cursor-pointer"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          {productData.map((item, idx) => (
            <div
              key={item.id ?? `new-${idx}`}
              className="flex flex-col gap-2 items-center p-3 border-[1px] border-black rounded-xl"
            >
              <div className="w-full h-50 ">
                <img
                  className="object-cover w-full h-full rounded-xl"
                  src={
                    item.thumbnail && item.thumbnail.startsWith("blob:")
                      ? item.thumbnail
                      : item.thumbnail
                  }
                  alt=""
                />
              </div>
              <h2 className="font-semibold ">{item.title}</h2>
              <p className="max-w-[250px] text-[12px] ">{item.description}</p>
              <div className="flex items-center justify-between w-full">
                <h3 className="font-medium">${item.price}</h3>
                <h3 className="font-medium">{item.category}</h3>
                <button
                  onClick={() => {
                    setShowEdit(true);
                    setTitle(item.title);
                    setCategory(item.category);
                    setDescription(item.description);
                    setPrice(item.price);
                    setImage(item.thumbnail);
                    setEditID(item.id);
                  }}
                  className="bg-green-400 text-white px-3 py-1 rounded-lg cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteHandler(item.id)}
                  className="bg-red-400 text-white px-3 py-1 rounded-lg cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CRUD;
