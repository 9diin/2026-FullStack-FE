import MeSidebar from "./me-sidebar"

function MeLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex h-full w-full gap-2">
            <MeSidebar />
            {children}
        </div>
    )
}

export default MeLayout
