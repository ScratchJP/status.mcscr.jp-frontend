"use client";
import { useState, useEffect } from "react";
import type { IncidentMetadata } from "@/utils/incident";
import { Avatar, AvatarFallback, AvatarImage, AvatarGroup } from "@/components/ui/avatar"
import authorData from "@/data/authors";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link";
import { formatDate } from "@/utils/date";

export default function IncidentCard({ incident } : {
  incident: IncidentMetadata,
}) {

  return (
    <div className="px-5 py-4 not-last:border-b border-b-(--border)">
      <Link href={`/incidents/${incident.id}`}>

        <div className="flex gap-1 items-end">
          <span className="text-xl font-medium mr-1">
            { incident.title }
          </span>

          <span className="text-base text-gray-500">
            { formatDate(incident.time) }
          </span>
        </div>

        <div className="flex gap-1 items-end">
          <span className="text-base text-gray-500">
            reported by
          </span>

          <Tooltip>
            <TooltipTrigger>
              <AvatarGroup>
                { incident.author.map((author: string) => (
                  <Avatar size="sm" key={author}>
                    <AvatarImage src={authorData.find(i => i.name === author)?.avatar} />
                    <AvatarFallback>
                      {author}
                    </AvatarFallback>
                  </Avatar>
                )) }
              </AvatarGroup>
            </TooltipTrigger>  
            <TooltipContent>
              {incident.author.join(', ')}
            </TooltipContent>
          </Tooltip>
        </div>

      </Link>
    </div>
  )
}