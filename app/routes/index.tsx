import { createFileRoute, useRouter } from "@tanstack/react-router";
import LargeDataComponent from "~/features/issues/components/LargeDataComponent";
const route = "/issues" as "/";

export const Route = createFileRoute(route)({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  return <LargeDataComponent router={router} />;
}
