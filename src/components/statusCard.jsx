"use client";
import { useState, useEffect } from "react";

export default function StatusCard({ status = [] }) {
  const [pingColor, setPingColor] = useState('gray-500')

  useEffect(() => {
    if (Array.isArray(status) && status.length) {
      setPingColor(status.every(item => item) ? 'green-500' : 'red-500');
    }
  }, [status]);

  return (
    <section className="flex flex-row items-center px-5 py-4 rounded-3xl shadow-[0_0_6px_gray] my-3">
      <div className={`rounded-full size-8 sm:size-12 relative after:content-[''] after:absolute after:inset-0 after:rounded-full after:animate-(--animate-ping-reduced) aspect-square m-4 bg-${pingColor} after:bg-${pingColor}`}></div>
      <h3 className={`ml-1 text-2xl sm:text-4xl font-medium ${status?.length ? 'text-inherit' : 'text-gray-500'}`}>
        {
          status?.length ? (
            status.every(item => item) ? (<>All systems <span className="text-green-500">Operational</span></>)
              : status.some(item => !item) ? (<>Some systems <span className="text-red-500">Down</span></>)
              : (<>All systems <span className="text-red-500">Down</span></>)
          ) : "Loading..."
        }
      </h3>
    </section>
  )
}