// src/app/admin/layout.tsx
import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import Providers from "./provider";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers >
          <main className="">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
