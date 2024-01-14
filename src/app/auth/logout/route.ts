import { api } from "~/trpc/server";

export async function POST() {
  try {
    await api.session.logout.mutate();
  } catch (e) {
    console.log(e);
  }
  return Response.json("");
}
