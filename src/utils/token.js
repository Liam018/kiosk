import jwt_decode from "jwt-decode";

export function isTokenExpired(token) {
  try {
    const decoded = jwt_decode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (e) {
    return true; 
  }
}
