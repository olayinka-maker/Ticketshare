// File: app/page.tsx - Main page component
import TicketCardSlider from "./tickets/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center  p-4">
      <div className="w-full max-w-md">
        <TicketCardSlider />
      </div>
    </main>
  );
}
