import AuthForm from "@/components/auth/Form";
import { getUserAuth } from "@/lib/auth/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const { session } = await getUserAuth();
  if (!session) redirect("/sign-up");
  return (
    <main className="">
      <h1 className="text-2xl font-bold my-2">Profile</h1>
      <pre className="bg-card p-4 rounded-lg my-2">
        {JSON.stringify(session, null, 2)}
      </pre>
      <AuthForm action="/api/sign-out" />
      <ul>
        <li>
          <Link href="/pages">Pages</Link>
        </li>
        <li>
          <Link href="/page-links">Links</Link>
        </li>
      </ul>
    </main>
  );
}
