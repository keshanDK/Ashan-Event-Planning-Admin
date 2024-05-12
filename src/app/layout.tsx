import Providers from "@/lib/providers";
import "./globals.css";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import Navigation from "@/app/manage/components/navigation";
import {Toaster} from "@/components/ui/toaster";
import {ClerkProvider} from '@clerk/nextjs'

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Ashan Event Planning Admin",
    description: "Ashan Event Planning Admin",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className}`}>
            <Providers>
                {children}
            </Providers>
            </body>
            </html>
        </ClerkProvider>
    );
}
