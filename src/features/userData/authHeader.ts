export type TypedAuthorization = {
  Authorization: string | null;
};
export default function authHeader(
  tokenArg: string
): TypedAuthorization | null {
  const token = tokenArg || JSON.parse(localStorage.getItem("user") || "");

  if (token) {
    return { Authorization: "Bearer " + token };
  }
  return null;
}
