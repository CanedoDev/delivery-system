export default function Container({ children }) {
    return (
        <div className="min-h-screen w-full bg-gray-50 text-gray-900 flex flex-col antialiased selection:bg-purple-500 selection:text-white">
            <main className="flex-1 w-full flex flex-col">
                {children}
            </main>
        </div>
    );
}
