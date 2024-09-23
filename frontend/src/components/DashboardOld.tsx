import { useState } from "react";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Globe,
  Home,
  MapPin,
  Menu,
  MessageSquare,
  PieChart,
  Search,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { DashboardNavbar } from "./DashboardNavbar";
import { SideDrawer } from "./SideDrawer";

export default function DashboardOld() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: Home, label: "Home" },
    { icon: PieChart, label: "Impact" },
    { icon: MessageSquare, label: "Articles" },
    { icon: Globe, label: "Events" },
    { icon: User, label: "About" },
    { icon: ShoppingCart, label: "Shop" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Collapsible Sidebar */}
      <DashboardNavbar />
      <div className="flex-1 flex flex-col overflow-hidden ">
        {/* Header */}
        <div className="flex p-4 gap-2 items-center">
          <Link to="../">
            <ChevronLeft
              size={25}
              strokeWidth={1.2}
              className="sm:hidden text-muted-foreground"
            />
          </Link>
          <div className="relative flex-grow">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search a team..."
            />
          </div>
          <SideDrawer
            trigger={
              <button className="sm:hidden inline-flex items-center justify-center rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                <Menu className="block h-6 w-6" />
              </button>
            }
            side="right"
          />
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b">
            <nav className="px-4 py-2">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to="/"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
        {/* Main Content Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-4 pt-0 ">
          <h1 className="text-xl mb-3 sm:mb-6 font-bold sm:tracking-tighter sm:text-xl md:text-4xl ">
            Community Impact Dashboard
          </h1>
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Striders
                  </CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">10,781</div>
                  <p className="text-xs text-muted-foreground">Worldwide</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Countries
                  </CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">84</div>
                  <p className="text-xs text-muted-foreground">
                    Active regions
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Items
                  </CardTitle>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">824.5k</div>
                  <p className="text-xs text-muted-foreground">Collected</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Distance
                  </CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">47,232.5km</div>
                  <p className="text-xs text-muted-foreground">Covered</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Global Impact Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-md"></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Top Items Collected</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      "Cigarette",
                      "Bottle [Plastic]",
                      "Can [Metal]",
                      "Packaging",
                      "Wrapper [Plastic]",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-[180px] h-2 bg-blue-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500"
                            style={{
                              width: `${100 - index * 15}%`,
                            }}
                          />
                        </div>
                        <span className="ml-4 text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Yeet Leaderboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      "Marcel Smits",
                      "Han Reijnders",
                      "Doggies of S...",
                      "Davidj",
                      "The Wanderi...",
                    ].map((name, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <span className="font-medium mr-2">{index + 1}.</span>
                          <span>{name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {34.2 - index * 2}k items
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
