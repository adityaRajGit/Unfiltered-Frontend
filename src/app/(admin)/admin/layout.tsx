// src/app/admin/layout.tsx
import React from "react";
import type { Metadata } from "next";
import "./globals.css";

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
        <main className="">{children}</main>
      </body>
    </html>
  );
}
