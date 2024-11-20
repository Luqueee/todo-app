import { signIn, signOut } from "@/auth";

export default function SignIn() {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/dashboard" });
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Signout</button>
      </form>
    </>
  );
}
