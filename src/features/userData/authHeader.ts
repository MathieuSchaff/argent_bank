export type Authorization = {
  Authorization?: string;
};
export default function authHeader(tokenArg: string): Authorization {
  const token = tokenArg || JSON.parse(localStorage.getItem("user") || "");

  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}
