import SignIn from "@/components/sign-in";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <SignIn />
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
