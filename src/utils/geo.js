// Haversine distance and helpers
export function toRad(val) {
  return val * Math.PI / 180;
}

export function distanceBetween([lat1, lon1], [lat2, lon2]) {
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error('Not available'));
    navigator.geolocation.getCurrentPosition((pos) => {
      resolve([pos.coords.latitude, pos.coords.longitude]);
    }, reject, { timeout: 10000 });
  });
}