import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { getSiteAccess, signOutOfSite } from "@/lib/site-session";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    const access = await getSiteAccess();
    if (access.status === "signed-out") {
      throw redirect({ to: "/auth", search: { redirect: location.href } });
    }
    if (access.status === "not-member") {
      await signOutOfSite();
      throw redirect({ to: "/auth", search: { erro: "dominio" } });
    }
    return { access };
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return (
    <>
      <LoadingScreen />
      <Outlet />
    </>
  );
}
