"use client"

import { useGetOverview } from "@/hooks/queries";

export default function OverviewPage() {
  const { data: overview } = useGetOverview();
  console.log(overview)
  return <div>Overview</div>;
}
