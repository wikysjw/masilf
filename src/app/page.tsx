import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import HomeClient from "@/components/HomeClient";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const cookieStore = await cookies();
  const isAuthed = cookieStore.get("auth")?.value;
  if (!isAuthed) {
    redirect("/login");
  }

  const userId = cookieStore.get("userId")?.value;
  const user = userId
    ? await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, name: true, role: true },
      })
    : null;

  return <HomeClient initialUser={user} />;
}
