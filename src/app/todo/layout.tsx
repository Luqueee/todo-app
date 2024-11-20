import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NavSidebar } from "./components/Navs/SideBar";
import { cookies } from "next/headers";
import ModalCreateTask from "./components/Modals/ModalCreateTask";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <NavSidebar />
      <main className="w-full h-full">
        <SidebarTrigger className=" mt-4" />
        <div className=" border-white border p-4 h-full">{children}</div>
      </main>
      <ModalCreateTask />
    </SidebarProvider>
  );
}