export type Authorization = {
  Authorization: string | null;
};
export default function authHeader(tokenArg: string): Authorization | null {
  const token = tokenArg || JSON.parse(localStorage.getItem("user") || "");

  if (token) {
    return { Authorization: "Bearer " + token };
  }
  return null;
}
