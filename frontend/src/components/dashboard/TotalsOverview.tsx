import {
  Smile,
  Package,
  Weight,
  MapPin,
  Clock,
  Globe,
  Users,
} from "lucide-react";
import { useFetch } from "@/hooks/use-fetch";
import data from "../../data/mockData.json";
console.log(data);
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

const colors = [
  "hsl(0, 100%, 83.92156862745098%)",
  "#ffd6a5",
  "#fdffb6",
  "#caffbf",
  "#9bf6ff",
  "#bdb2ff",
  "#ffc6ff",
  "#fffffc",
  "#eae4e9",
  "#bee1e6",
  "#faedcd",
];

const statItems: StatItem[] = [
  {
    icon: <Globe className="w-5 h-5 text-red-500" />,
    label: "Countries",
    value: "46",
    color: colors[0],
  },
  {
    icon: <Users className="w-5 h-5 text-orange-500" />,
    label: "Striders",
    value: "8,272",
    color: "bg-pink-100",
  },
  {
    icon: <Smile className="w-5 h-5 text-yellow-500" />,
    label: "Strides",
    value: "",
    color: "",
  },
  {
    icon: <Package className="w-5 h-5 text-green-500" />,
    label: "Items",
    value: "",
    color: "bg-red-500",
  },
  {
    icon: <Weight className="w-5 h-5 text-blue-500" />,
    label: "Weight",
    value: "",
    color: "bg-blue-500",
  },
  {
    icon: <MapPin className="w-5 h-5 text-purple-500" />,
    label: "Distance",
    value: "",
    color: "bg-yellow-500",
  },
  {
    icon: <Clock className="w-5 h-5 text-pink-500" />,
    label: "Time",
    value: "",
    color: "bg-purple-500",
  },
];

export const TotalsOverview = () => {
  // const { data, isFetching, isPending } = useFetch(
  //   "/api/strides/current/total-stats",
  //   "TotalsOverview"
  // );
  // if (isFetching) return <h1>"Loading for the first time"</h1>;
  // if (isPending) return <h1>"Refetching data in the background"</h1>;
  // const statsData = [
  //   data[0].total_strides_countries,
  //   data[0].total_strides_users,
  //   data[0].total_strides,
  //   data[0].total_items_picked,
  //   data[0].total_weight,
  //   data[0].total_distance,
  //   data[0].total_time_in_minutes,
  // ];
  const statsData = [
    46,
    "10,809",
    "6,500",
    "829,000",
    "20,136kg",
    "47,400km",
    "4194d 49mins",
  ];
  const statsDataItems = statItems.map((i, idx) => ({
    ...i,
    value: statsData[idx],
  }));
  return (
    <Card className="bg-transparent border-none shadow-none ">
      <CardHeader className="p-0 pb-1">
        <CardTitle>Global Strides Impact</CardTitle>
        <CardDescription>
          Tracking contributions across various metrics as of 2024.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 py-5 flex flex-col gap-3">
        {statsDataItems.map((stat, index) => (
          <div key={index} className="flex items-center gap-4">
            <div
              className={`p-2 rounded-full ${stat.color}`}
              style={{ backgroundColor: colors[index] }}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">{stat.label}</p>
              <p className="text-md font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm p-0 pt-0 ">
        <div className="flex gap-2 font-medium leading-none">
          A step towards a cleaner planet
        </div>
        <div className="leading-none text-muted-foreground">
          Every stride, item, and distance counts in the effort to make the
          world a cleaner place.
        </div>
      </CardFooter>
    </Card>
  );
};
