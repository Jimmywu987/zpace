import { req } from "./https";

export async function createUser(params: any) {
  return await req("post", "/api/auth/sign-up", params);
}

export async function updateProfileImg(id: string, params: any) {
  return await req("post", `/api/profile/${id}/`,params);
}
