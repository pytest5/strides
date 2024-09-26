import React from "react";
import { Button } from "./ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  Home,
  MessageSquare,
  PieChart,
  ShoppingCart,
  User,
} from "lucide-react";
import { IoLogoAppleAr } from "react-icons/io5";
import { Link } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home" },
  { icon: PieChart, label: "Impact" },
  { icon: MessageSquare, label: "Articles" },
  { icon: Globe, label: "Events" },
  { icon: User, label: "About" },
  { icon: ShoppingCart, label: "Shop" },
];

export const DashboardNavbar = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <aside
      className={`bg-white border-r transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-48"
      } hidden sm:flex flex-col `}
    >
      <div
        className={`p-4 flex items-center ${
          isCollapsed ? "justify-center" : "justify-between"
        }`}
      >
        <IoLogoAppleAr size={24} />
        {!isCollapsed && <span className="font-bold text-xl">Strides</span>}
      </div>
      <nav className="flex-1 mt-8 ">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to="/"
            className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
              isCollapsed ? "justify-center" : "justify-between	"
            }`}
          >
            <item.icon className="h-5 w-5" />
            {!isCollapsed && <span className="ml-3">{item.label}</span>}
          </Link>
        ))}
      </nav>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleCollapse}
        className={`m-4 flex items-center ${
          isCollapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!isCollapsed && <span>Collapse</span>}
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
    </aside>
  );
};
