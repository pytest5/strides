import React, { Suspense, lazy, useState } from "react";
import { ChevronRight, ChevronLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FrostedCardWrapper } from "./FrostedCardWrapper";
import { TotalsOverview } from "./dashboard/TotalsOverview";
import { DialogFilterButton } from "./DialogFilterButton";
import LoadingSpinner from "./LoadingSpinner"; // Assuming this is your loading indicator
import { MapRef } from "react-map-gl";
import data from "../data/countries_with_coords.json";
import CountryFinder from "./CountryFinder";

const ItemsBarChart = lazy(() => import("./dashboard/ItemsBarChart"));
const ItemsPieChart = lazy(() => import("./dashboard/ItemsPieChart"));
const StridesMap = lazy(() => import("./StridesMap"));

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mapRef = React.useRef<MapRef | null>(null);

  const handleSelectCountry = (countryName: string) => {
    const selectedCountry = data.find((i) => i.name === countryName);
    if (selectedCountry) {
      const { latitude, longitude } = selectedCountry;
      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [longitude, latitude],
          zoom: 5,
          duration: 6000,
          essential: true,
        });
      }
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* Map */}
      <div className="absolute inset-0 bg-gray-700">
        <Suspense fallback={<LoadingSpinner />}>
          <StridesMap ref={mapRef} />
        </Suspense>
      </div>

      {/* Top Navbar */}
      <div className="w-full sticky top-0 flex self-start justify-between gap-3 pt-4 px-4 bg-transparent">
        {/* Sidebar Toggle Button */}
        <div
          className={`h-full relative sm:absolute sm:top-4 sm: transition-all duration-300 ease-in-out ${
            sidebarOpen ? "sm:left-[calc(320px+58px)]" : "left-0"
          }`}
        >
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/80 text-gray-800 hover:bg-gray-200/80 backdrop-blur-sm z-20"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? (
              <ChevronLeft className="h-6 w-6" />
            ) : (
              <ChevronRight className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Navbar */}
        <div className="relative flex flex-1 items-center justify-end gap-3 sm:absolute sm:top-4 sm:right-4 ">
          {/* Country finder */}
          <CountryFinder
            handleSelect={handleSelectCountry}
            className="bg-gray-00/10 backdrop-blur-sm text-white"
          />
          {/* Filter icon */}
          <DialogFilterButton />
        </div>
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div
          className={`flex-1 overflow-auto sm:h-full relative sm:absolute top-0 left-0 transition-all duration-300 ease-in-out z-10 ${
            sidebarOpen ? "w-full sm:w-96" : "w-0"
          }`}
        >
          <div className="h-full border-r border-white/20">
            <div className="p-4 space-y-4 sm:h-full sm:overflow-auto flex flex-col custom-scrollbar sm:pr-0">
              {/* Team searcher */}
              <Input
                type="text"
                placeholder="Search a team..."
                className="px-4 py-2 rounded-lg text-black w-full sm:w-45 bg-white/80 backdrop-blur-sm"
              />

              {/* Conditionally load the heavy components when the sidebar is open */}
              {sidebarOpen && (
                <Suspense fallback={<LoadingSpinner />}>
                  {/* Items bar chart */}
                  <FrostedCardWrapper>
                    <ItemsBarChart />
                  </FrostedCardWrapper>

                  {/* Items pie chart */}
                  <FrostedCardWrapper>
                    <ItemsPieChart />
                  </FrostedCardWrapper>
                </Suspense>
              )}

              {/* Totals overview */}
              <FrostedCardWrapper>
                <TotalsOverview />
              </FrostedCardWrapper>

              {/* Leaderboard */}
              <FrostedCardWrapper>
                <CardContent className="p-4">
                  <h3 className="font-bold mb-2">Strides Leaderboard</h3>
                  <ol className="list-decimal list-inside">
                    <li>
                      Marcel Smits{" "}
                      <span className="float-right">34.2k items</span>
                    </li>
                    <li>
                      Han Reijnders{" "}
                      <span className="float-right">32.2k items</span>
                    </li>
                    <li>
                      Doggies of S...{" "}
                      <span className="float-right">30.2k items</span>
                    </li>
                    <li>
                      Davidj <span className="float-right">28.2k items</span>
                    </li>
                    <li>
                      The Wanderi...{" "}
                      <span className="float-right">26.2k items</span>
                    </li>
                  </ol>
                </CardContent>
              </FrostedCardWrapper>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
