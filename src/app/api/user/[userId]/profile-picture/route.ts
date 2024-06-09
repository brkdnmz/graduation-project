import fs from "fs";
import { NextResponse, type NextRequest } from "next/server";
import path from "path";
import { api } from "~/trpc/server";

// export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  let response: NextResponse;
  try {
    const pp = await api.user.getProfilePicture.query({
      userId: Number(params.userId),
    });

    response = new NextResponse(pp);
  } catch (e) {
    console.log(e);

    const placeholderPath = path.join(
      process.cwd(),
      "public",
      "profile-placeholder.png",
    );

    response = new NextResponse(fs.readFileSync(placeholderPath));
  }

  response.headers.set("content-type", "image/png");
  return response;
}
