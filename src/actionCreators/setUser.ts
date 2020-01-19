export default function setUser(user: { token: string }) {
  return { type: "SET_USER_TOKEN", payload: user.token };
}
