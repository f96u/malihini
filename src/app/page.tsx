import { ChatWidget } from "@/components/ChatWidget";
import MapSample from "@/components/MapSample";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start h-full w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">チャット</h2>
            <ChatWidget />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">地図</h2>
            <MapSample />
          </div>
        </div>
      </main>
    </div>
  );
}
