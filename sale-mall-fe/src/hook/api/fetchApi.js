// import { useEffect, useState } from "react";
// import instanse from "./instanse";

// const useFetchApi = async (url) => {
//   const [data, setData] = useState([]);
//   console.log("data", data);
//   const [loading, setLoading] = useState(false);

//   async function fetchApi(apiUrl) {
//     try {
//       setLoading(true);
//       const path = apiUrl || url;
//       const response = await instanse.get(path);
//       setData(response?.data);
//     } catch (error) {
//       console.log("Error useFetchApi", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchApi(url);
//   }, []);

//   return {
//     fetchApi,
//     data,
//     setData,
//     loading,
//   };
// };

// export default useFetchApi;

import axios from "axios";

export const getBaseApiUrl = () => window.apiUrl;

export const axiosQuery = async (args) => {
  const authToken = localStorage.getItem("authData");

  let {
    url,
    method = "GET",
    body = undefined,
    baseUrl = undefined,
    responseType = "json",
  } = typeof args == "string" ? { url: args } : args;

  let config = {
    baseURL: baseUrl || getBaseApiUrl(),
    url: url,
    method: method,
    data: body,
    responseType: responseType,
  };

  if (authToken) {
    config = {
      ...config,
      headers: { Authorization: `Bearer ${authToken}` },
    };
  }

  try {
    const response = await axios(config);
    return response;
  } catch (e) {
    console.log("Error", e);
    return e;
  }
};
