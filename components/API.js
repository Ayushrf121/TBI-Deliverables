const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

console.log('Current API Base URL:', API_BASE_URL);

const api = `${API_BASE_URL}/api/auth/`;
export default api;