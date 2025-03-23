// File: app/page.tsx - Main page component
import { TicketProvider } from './_components/TicketContext';
import TicketViewer from './_components/TicketViewer';


export default function Home() {
  return (
    <TicketProvider>
      <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
        <div className="w-full max-w-md">
          <TicketViewer />
        </div>
      </main>
    </TicketProvider>
  );
}