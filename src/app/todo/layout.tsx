import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NavSidebar } from "./components/Navs/SideBar";
import { cookies } from "next/headers";
import ModalCreateTask from "./components/Modals/ModalCreateTask";
import { connectDB } from "@/lib/db";
import TaskNav from "./tasks/components/TaskNav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  await connectDB();

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <NavSidebar />
      <main className="w-full h-full">
        <SidebarTrigger className=" mt-4" />
        <div className="  p-4 h-full">
          <TaskNav />
          <hr className="my-2 bg-border" />
          {children}
        </div>
      </main>
      <ModalCreateTask />
    </SidebarProvider>
  );
}
