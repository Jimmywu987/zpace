import { User } from "@/types/User";
import { req } from "./https";

export async function createUser(params: any) {
  return await req("post", "/api/auth/sign-up", params);
}

export async function updateProfileImg(id: string, params: any) {
  return await req("post", `/api/profile/${id}/`, params);
}

export async function updateUserInfo(params: any) {
  return await req("post", `/api/user/update`, params);
}

export async function updateUserSession(params: any) {
  return await req("post", `/api/user/update-session`, params);
}

export async function createRoom(params: any) {
  return await req("post", "/api/room/create", params);
}

export async function editRoom(params: any) {
  return await req("post", "/api/room/edit", params);
}

export async function deleteRoom(params: any) {
  return await req("delete", "/api/room/delete", params);
}

export async function fetchRooms(params: any) {
  return await req("post", "/api/room/fetch-room", params);
}

export async function likeRoom(params: any) {
  return await req("get", "/api/room/like", params);
}

export async function unlikeRoom(params: any) {
  return await req("delete", "/api/room/unlike", params);
}

export async function paymentCheckout(params: any) {
  return await req("post", "/api/checkout-session", params);
}
