import { cookies } from "next/headers";
import { decrypt } from "./session";

export async function getAuthUser() {
  const cookie = (await cookies()).get("session")?.value;

  // ✅ If no session cookie, return null instead of causing an error
  if (!cookie) {
    return null;
  }

  const session = await decrypt(cookie);

  // ✅ Ensure session is valid before accessing `userId`
  if (!session || !session.userId) {
    return null;
  }

  return { isAuth: true, userId: session.userId };
}