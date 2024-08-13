import { ReactNode } from "react";

import CreateLayout from "@/app/layouts/createLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return <CreateLayout>{children}</CreateLayout>;
}
