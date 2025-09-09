import axios from "~/lib/axios";

export type SignUpData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignUpResponse = {
  message: string;
  // Add other response fields as needed
};

/**
 * Register a new user
 */
export const registerUser = async (
  data: SignUpData,
): Promise<SignUpResponse> => {
  try {
    const response = await axios.post<SignUpResponse>(
      "/api/auth/register",
      data,
    );
    return response.data;
  } catch (err: unknown) {
    console.log(err);
    throw new Error("خطا در ثبت نام");
  }
};
