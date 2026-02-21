"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import StatusCard from '@/components/statusCard'
import Monitor from '@/components/monitor'
import { Separator } from "@/components/ui/separator";
import IncidentCard from '@/components/incidentCard';
import { IncidentMetadata } from "@/utils/incident";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [statusHistory, setStatusHistory] = useState(null);
  const [currentStatus, setCurrentStatus] = useState<(boolean | null)[]>([null]);

  const [incidents, setIncidents] = useState([]);
  const [showOlder, setShowOlder] = useState(false);

  useEffect(() => {
    // Fetch status history every minute
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
    const interval = setInterval(fetchStatusHistory, 30_000);
    fetchCurrentStatus();
    const statusInterval = setInterval(fetchCurrentStatus, 30_000);
    // Clear both intervals on unmount
    return () => {
      clearInterval(interval);
      clearInterval(statusInterval);
    };
  }, []);

  useEffect(() => {
    async function fetchIncidents(getAll: boolean) {
      try {
        const res = await fetch(`/api/incidents${getAll ? "?all" : ""}`);
        const data = await res.json();
      
        setIncidents(data.map((incident: any) => ({
          ...incident,
          time: new Date(incident.time),
        })).sort((a: IncidentMetadata, b: IncidentMetadata) => 
          b.time.getTime() - a.time.getTime()
        ));
      } catch (error) {
        console.error("Failed to fetch incidents:", error);
      }
    }

    fetchIncidents(showOlder);
  }, [showOlder])

  const handleShowOlder = () => {
    setShowOlder(true);
  };

  return (
    <>

      <div className="mx-4 mt-6 mb-8">
        <p className="my-4 text-2xl font-medium border-l-blue-400/80 border-l-5 px-4">Status</p>

        <div className="rounded-3xl shadow-[0_0_6px_gray]">
          <StatusCard status={currentStatus} />

          <Separator />

          <section className="px-5 py-4">
            <Monitor
              name="ScratchJP Minecraft Server" 
              data={statusHistory} 
            />
          </section>
        </div>
      </div>

      <div className="m-4 mt-6 mb-8">
        <p className="my-4 text-2xl font-medium border-l-blue-400/80 border-l-5 px-4">Incidents</p>

        <div className="rounded-3xl shadow-[0_0_6px_gray]">
          {incidents.map((incident: IncidentMetadata) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}

          {!showOlder && (
            <div className="grid justify-center py-2">

              <Button onClick={handleShowOlder}>
                See older incidents
              </Button>

            </div>
          )}

        </div>
      </div>

    </>
  );
}
