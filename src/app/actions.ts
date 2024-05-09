"use server";

import { revalidatePath } from "next/cache";

// An action for revalidating the router cache.
export default async function revalidateCache() {
  // Currently, revalidatePath invalidates all the routes in the client-side Router Cache.
  // This behavior is temporary and will be updated in the future to apply only to the specific path.
  // https://nextjs.org/docs/app/api-reference/functions/revalidatePath
  revalidatePath("/");
}
