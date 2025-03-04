"use client";

import { PaginationProvider } from "@/providers/Pagination";

import { SimulationManagerList } from "../Simulations/Manager/SimulationManagerList";
import { SimulationManagerPagination } from "../Simulations/Manager/SimulationManagerPagination";
import { SimulationManagerSearchBox } from "../Simulations/Manager/SimulationManagerSearchBox";

export default function Manage() {
  return (
    <PaginationProvider>
      <SimulationManagerSearchBox />
      <SimulationManagerList />
      <SimulationManagerPagination />
    </PaginationProvider>
  );
}
