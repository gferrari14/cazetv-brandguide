import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/brandguide")({
  beforeLoad: () => {
    throw redirect({ to: "/logo" });
  },
});
