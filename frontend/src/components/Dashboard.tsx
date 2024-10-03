import React, { Suspense, lazy } from "react";
import { useState } from "react";
import { ChevronRight, ChevronLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
// import { StridesMap } from "./StridesMap";
import { FrostedCardWrapper } from "./FrostedCardWrapper";
import { TotalsOverview } from "./dashboard/TotalsOverview";
import { ItemsBarChart } from "./dashboard/ItemsBarChart";
import { ItemsPieChart } from "./dashboard/ItemsPieChart";
import { SideDrawer } from "./SideDrawer";
import { DialogFilterButton } from "./DialogFilterButton";
import { useFetch } from "@/hooks/use-fetch";
import fetchCountryCoords from "@/utils/fetchCountryCoords";
import LoadingSpinner from "./LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { MapRef } from "react-map-gl";

export function Dashboard() {
  // const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const { data, isPending } = useFetch("/api/strides/location", [
  //   "fetchStrideLocations",
  // ]);

  const StridesMap = lazy(() => import("./StridesMap"));

  // const fetchClusters = async () => {
  //   const url = "/api/strides/clusters";
  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       body: JSON.stringify({ zoom: mapbox.getZoom() }),
  //     });
  //     if (!response.ok) {
  //       throw new Error(`Response status: ${response.status}`);
  //     }
  //     const json = await response.json();
  //     console.log(json);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.error(error.message);
  //     } else {
  //       console.log(error);
  //     }
  //   }
  // };

  // const data = useQuery({
  //   queryKey: ["fetchClusters"],
  //   queryFn: fetchClusters,
  // });

  // const countryCoords = fetchCountryCoords(data);

  const mapRef = React.useRef<MapRef | null>(null);

  interface CountryPosition {
    latitude: number;
    longitude: number;
  }

  // type CountryCoord = { name: string; coordinates: CountryPosition };

  // const countryCoordsTyped: CountryCoord[] = countryCoords;

  const handleSelectCountry = (countryName: string) => {
    setSelectedCountry(countryName);
    const selectedCountry = countryCoordsTyped.find(
      (i) => i.name === countryName
    );
    if (selectedCountry) {
      const { latitude, longitude } = selectedCountry.coordinates;
      console.log("Flying to:  ", latitude, longitude);
      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [longitude, latitude],
          zoom: 5,
          duration: 12000,
          essential: true,
        });
      }
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    // mapRef.current.resize();
  };

  // if (isPending) {
  //   return <LoadingSpinner />;
  // }

  return (
    <div className="h-full flex flex-col relative ">
      {/* Map */}
      <div
        className="absolute inset-0 bg-gray-700 "
        style={{ touchAction: "none" }}
      >
        <div>
          <Suspense fallback={<LoadingSpinner />}>
            <StridesMap ref={mapRef} />
          </Suspense>
        </div>
      </div>
      {/* Top Navbar */}
      <div className=" w-full sticky top-0 flex self-start justify-between gap-3 pt-4 px-4  bg-transparent">
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
          {/* <Select onValueChange={handleSelectCountry}>
            <SelectTrigger className="w-[120px] sm:w-[160px] bg-gray-00/10 backdrop-blur-sm text-white">
              <SelectValue placeholder="All countries" />
            </SelectTrigger>
            <SelectContent>
              <div className="p-2">
                <Input
                  placeholder="Search countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-2"
                />
              </div>
              {countryCoords?.map((country) => (
                <SelectItem key={country.name} value={country.name}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}
          {/* Filter icon */}
          <DialogFilterButton />
          <SideDrawer
            trigger={
              <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                <Menu className="block h-6 w-6 text-white" />
              </button>
            }
          />
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`flex-1 overflow-auto sm:h-full relative sm:absolute top-0 left-0 transition-all duration-300 ease-in-out z-10 ${
          sidebarOpen ? "w-full sm:w-96" : "w-0"
        }`}
      >
        {/* <div className="h-full bg-white/10 backdrop-blur-md border-r border-white/20 overflow-y-auto custom-scrollbar"></div> */}
        <div className="h-full border-r border-white/20 ">
          <div className="p-4 space-y-4  sm:h-full sm:overflow-auto flex flex-col custom-scrollbar sm:pr-0">
            {/* Team searcher */}
            <Input
              type="text"
              placeholder="Search a team..."
              className="px-4 py-2 rounded-lg text-black w-full sm:w-45 bg-white/80 backdrop-blur-sm"
            />
            {/* Items bar chart */}
            <FrostedCardWrapper>
              <ItemsBarChart />
            </FrostedCardWrapper>
            {/* Items pie chart */}
            <FrostedCardWrapper>
              <ItemsPieChart />
            </FrostedCardWrapper>
            {/* Totals overview */}
            <FrostedCardWrapper>
              <TotalsOverview />
            </FrostedCardWrapper>
            {/* Leader board */}
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
      {/* Location Card */}
      {/* {selectedLocation && (
        <Card className="absolute top-20 sm:top-4 right-4 left-4 sm:left-auto sm:w-64 bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">{selectedLocation.name}</h3>
              <Button variant="ghost" size="icon" onClick={closeLocationCard}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p>{selectedLocation.description}</p>
          </CardContent>
        </Card>
      )} */}
    </div>
  );
}
