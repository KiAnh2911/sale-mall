import { axiosQuery } from "./fetchApi";

export const createApi = async (data, url) => {
  try {
    const res = await axiosQuery({
      url,
      method: "POST",
      body: data,
    });
    return res?.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const updateApi = async (data, url) => {
  try {
    const res = await axiosQuery({
      url,
      method: "PATCH",
      body: data,
    });

    return res?.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getAll = async () => {
  try {
    const res = await axiosQuery({
      url: "/product/list",
      method: "GET",
    });
    return res?.data;
  } catch (error) {
    console.log("error", error);
  }
};
