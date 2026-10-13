import "./globals.css"
import localFont from "next/font/local"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { AppHeader } from "@/components/common"
import { Toaster } from "@/components/ui/toast"

const paperlogy = localFont({
    src: [
        { path: "../public/fonts/Paperlogy-1Thin.ttf", weight: "100" },
        { path: "../public/fonts/Paperlogy-2ExtraLight.ttf", weight: "200" },
        { path: "../public/fonts/Paperlogy-3Light.ttf", weight: "300" },
        { path: "../public/fonts/Paperlogy-4Regular.ttf", weight: "400" },
        { path: "../public/fonts/Paperlogy-5Medium.ttf", weight: "500" },
        { path: "../public/fonts/Paperlogy-6SemiBold.ttf", weight: "600" },
        { path: "../public/fonts/Paperlogy-7Bold.ttf", weight: "700" },
        { path: "../public/fonts/Paperlogy-8ExtraBold.ttf", weight: "800" },
        { path: "../public/fonts/Paperlogy-9Black.ttf", weight: "900" },
    ],
    variable: "--font-paperlogy",
    display: "swap",
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="ko" suppressHydrationWarning className={cn(paperlogy.variable, "antialiased", "font-sans")}>
            <body>
                <ThemeProvider defaultTheme="dark">
                    <div className="flex min-h-screen flex-col gap-2 p-4 pt-2">
                        <AppHeader />
                        <main className="h-[calc(100vh-4rem)] w-full">{children}</main>
                    </div>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    )
}
