import SharedPreferences from "../../database/share_preferences_helper";
import axiosClient from "../axios-client";
import { app_api } from "../config";
import { ADD_URL } from "./config";

export const handleAddTOR = async (name, price, slot,idOwner  ) => {
  try {
    const headers = {
      Authorization: await SharedPreferences.GET_TOKEN(),
      RefreshToken: await SharedPreferences.GET_TOKEN(),
    };
    const response = await axiosClient.post(
      `${app_api}/${ADD_URL}`,
      {
        name,
        price,
        slot,
        idOwner
      },
      {headers}
    );
    return response;
  } catch (error) {
    console.log(`error type-of-room-service: ${error.message}`);
    console.log('API Request Payload:', {
        name: name,
        price:price,
        slot: slot,
      });
      
  }
};

export const handledGetTOR = async () => {
  try {
    const headers = {
      Authorization: await SharedPreferences.GET_TOKEN(),
      RefreshToken: await SharedPreferences.GET_TOKEN(),
    };
    const response = await axiosClient.get(
      `${app_api}/${ADD_URL}`,
      {headers}
    );
    return response.data;
  } catch (error) {
    console.log(`error type-of-room-service: ${error.message}`);   
  }
};
