"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  ArrowLeft,
  HelpCircle,
  Minus,
  Plus,
  Package,
  Settings,
  Users,
  BarChart,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const wasteCategories = [
  { name: "Glass", icon: "🍾" },
  { name: "Plastic", icon: "🥤" },
  { name: "Metal", icon: "🥫" },
  { name: "Bags", icon: "🛍️" },
  { name: "Cups", icon: "☕" },
  { name: "Packaging", icon: "📦" },
  { name: "Tissue", icon: "🧻" },
  { name: "Cigarette", icon: "🚬" },
  { name: "Others", icon: "🗑️" },
];

export default function AddStridesPage() {
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: wasteCategories.reduce(
      (acc, category) => ({ ...acc, [category.name.toLowerCase()]: 0 }),
      {}
    ),
  });
  const [selectedCategory, setSelectedCategory] = useState("");

  const onSubmit = (data) => {
    console.log(data);
    // Here you would typically send the data to your backend
  };

  const watchAllFields = watch();
  const totalItems = Object.values(watchAllFields).reduce(
    (sum, value) => sum + (value || 0),
    0
  );

  const handleCategoryClick = (category) => {
    const lowerCaseCategory = category.toLowerCase();
    const currentValue = watchAllFields[lowerCaseCategory] || 0;
    setValue(lowerCaseCategory, currentValue + 1);
    setSelectedCategory(lowerCaseCategory);
  };

  return (
    <div className=" flex flex-col h-full flex-1 md:flex-row bg-gray-100 text-foreground">
      {/* Strides Summary */}
      <aside className="grid p-5 py-0 sm:flex-col w-full md:w-64 md:p-6 border-r">
        <h2 className="text-sm font-semibold text-gray-700 pb-4">
          Current Stride Summary
        </h2>
        {/* Points / Items / Time / Dist */}
        <div className="flex flex-1 md:flex-col items-stretch text-center bg-slate-200 md:bg-gray-100 rounded-md py-3 pr-4 md:border-none">
          <div className="border-r-2  border-slate-300 flex-1 md:border-r-0">
            <Label className="font-normal text-gray-500">Points</Label>
            <p className="text-md md:text-2xl font-bold ">{totalItems}</p>
          </div>
          <Separator className="hidden md:block" />
          <div className="border-r-2 border-slate-300 flex-1 md:border-r-0">
            <Label className="font-normal text-gray-500">Items</Label>
            <p className="text-md md:text-2xl font-bold">{totalItems}</p>
          </div>
          <Separator className="hidden md:block" />
          <div className="border-r-2  border-slate-300 flex-1 md:border-r-0">
            <Label className="font-normal text-gray-500">Time</Label>
            <p className="text-md md:text-2xl font-bold">15m</p>
          </div>
          <Separator className="hidden md:block" />
          <div className="flex-1">
            <Label className="font-normal text-gray-500">Distance</Label>
            <p className="text-md md:text-2xl font-bold">0.1 km</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-6">
        <h1 className="text-sm font-semibold text-gray-700 pb-4 md:text-3xl md:font-bold md:mb-6">
          Current Stride
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card className="">
            <CardHeader className="hidden md:block py-4 md:p-6">
              <CardTitle>Waste Categories</CardTitle>
            </CardHeader>
            <CardContent className="bg-slate-200 pt-4 md:pt-0 grid grid-cols-3 lg:grid-cols-4 gap-4">
              {wasteCategories.map((category) => (
                <Button
                  key={category.name}
                  variant={
                    watchAllFields[category.name.toLowerCase()] > 0
                      ? "default"
                      : "outline"
                  }
                  className="h-24 flex bg-gray-100 flex-col justify-center items-center relative"
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <span className="text-2xl mb-2">{category.icon}</span>
                  <span className="text-sm">{category.name}</span>
                  {watchAllFields[category.name.toLowerCase()] > 0 && (
                    <Badge
                      className="absolute top-1 right-1"
                      variant="secondary"
                    >
                      {watchAllFields[category.name.toLowerCase()]}
                    </Badge>
                  )}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quantity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    selectedCategory &&
                    setValue(
                      selectedCategory,
                      Math.max(0, (watchAllFields[selectedCategory] || 0) - 1)
                    )
                  }
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Controller
                  name={selectedCategory}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      className="w-20 text-center"
                      value={field.value || 0}
                      onChange={(e) =>
                        field.onChange(
                          Math.max(0, parseInt(e.target.value) || 0)
                        )
                      }
                    />
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    selectedCategory &&
                    setValue(
                      selectedCategory,
                      (watchAllFields[selectedCategory] || 0) + 1
                    )
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Label>
                  {selectedCategory
                    ? selectedCategory.charAt(0).toUpperCase() +
                      selectedCategory.slice(1)
                    : "Select a category"}
                </Label>
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-4">
            <Button type="button" variant="outline" className="flex-1">
              End Stride
            </Button>
            <Button type="submit" className="flex-1">
              Save Pickup
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
