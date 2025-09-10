import axios from "~/lib/axios";

export const getUser = async () => {
    const res = await axios.get("/api/user-profiles");
    return res.data;
 };

