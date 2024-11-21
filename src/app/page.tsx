import SignIn from "@/components/sign-in";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <SignIn />
      <Link href="/todo/dashboard">Dashboard</Link>
    </div>
  );
}
