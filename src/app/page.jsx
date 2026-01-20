"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import StatusCard from '@/components/statusCard'
import Monitor from '@/components/monitor'

export default function Home() {
  const [statusHistory, setStatusHistory] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);
  // Fetch status history every minute
  useEffect(() => {
    async function fetchStatusHistory() {
      try {
        const res = await fetch("https://statusapi.mcscr.jp/history");
        if (res.ok) {
          const data = await res.json();
          setStatusHistory(data);
        }
      } catch (error) {
        console.error("Failed to fetch status history:", error);
      }
    }
    // Fetch current status and update statusHistory with error info
    async function fetchCurrentStatus() {
      try {
        const res = await fetch("https://statusapi.mcscr.jp/status");
        const data = await res.json();
        if (data.status) {
          setCurrentStatus([true]);
        } else {
          setCurrentStatus([false]);
        }
      } catch (error) {
        console.error("Failed to fetch current status:", error);
      }
    }
    fetchStatusHistory();
    const interval = setInterval(fetchStatusHistory, 60_000);
    fetchCurrentStatus();
    const statusInterval = setInterval(fetchCurrentStatus, 60_000);
    // Clear both intervals on unmount
    return () => {
      clearInterval(interval);
      clearInterval(statusInterval);
    };
  }, []);

  return (
    <main className="w-full max-w-5xl my-4 mx-auto">
      <div className="m-6">
        <StatusCard status={currentStatus} />

        <section className="mt-8 p-6 py-4 rounded-3xl shadow-[0_0_6px_gray]">
          <Monitor name="ScratchJP Minecraft Server" data={statusHistory} />
        </section>
      </div>
    </main>
  );
}
