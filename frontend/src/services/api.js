const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export async function getLocations() {
  const res = await fetch(`${API_BASE}/api/locations`);

  if (!res.ok) {
    throw new Error("Failed to fetch locations");
  }

  return res.json();
}

export async function getCurrentUV(lat, lon) {
  const res = await fetch(`${API_BASE}/api/uv/current?lat=${lat}&lon=${lon}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch UV data");
  }

  return data;
}

export async function getLocationByName(locationName) {
  const locations = await getLocations();

  const match = locations.find((item) => {
    const suburb = item.suburb?.toLowerCase() || "";
    const state = item.state?.toLowerCase() || "";
    const fullName = `${suburb}, ${state}`;

    return (
      suburb === locationName.toLowerCase() ||
      fullName === locationName.toLowerCase()
    );
  });

  if (!match) {
    throw new Error("Location not found");
  }

  return match;
}