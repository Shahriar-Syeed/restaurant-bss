import { api } from "./axiosInstance";

export const checkPhoneNumberExist = async (phoneNumber) => {

    try {
      const response = await api.get(
        `Auth/phoneNumberExist/${phoneNumber}`
      );
      if (response.status === 200) {
      return response.data;
        
      }
    } catch (error) {
      console.error(error);
    }
};