import EmployeeTemplate from "@/components/modal/EmployeeTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tix Train",
  description: "Sekopling Express",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <EmployeeTemplate>{children}</EmployeeTemplate>;
}
