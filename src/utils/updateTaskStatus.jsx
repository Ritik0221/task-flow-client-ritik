
import axios from "../api/axiosInstance";

export async function updateTaskStatus(id) {
  try {
    const res = await axios.put(`/tasks/updatestat/${id}`, {
      status: "Completed"
    });
    return res.data;
  } catch (err) {
    console.error("Status update failed:", err);
    return null;
  }
}
