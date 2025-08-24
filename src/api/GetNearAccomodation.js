import axios from "axios";

const GetNearAccomodation = async (locationId, radius = 2000) => {
  try {
    if (!locationId) {
      throw new Error("Location ID is required");
    }

    const apiUrl =
      import.meta.env.VITE_LOCATION_API_URL ||
      `${import.meta.env.VITE_API_BASE_URL}/locations`;
    const response = await axios.get(
      `${apiUrl}/${locationId}/nearby-accommodation`,
      {
        params: {
          radius: radius,
        },
      }
    );

    // API에서 5개만 추출한다고 했으므로 혹시 더 많이 오면 상위 5개만 반환
    const foodData = response.data;
    return Array.isArray(foodData) ? foodData.slice(0, 5) : foodData;
  } catch (error) {
    console.error("Error fetching nearby food:", error);
    throw error;
  }
};

export default GetNearAccomodation;
