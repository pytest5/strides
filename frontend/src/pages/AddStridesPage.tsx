import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitStride, Location } from "@/services/stridesService";
import { useUser } from "@/components/UserProvider";
import { useGeoLocation } from "@/hooks/use-geo-location";
import { TeamComboBox } from "@/components/TeamComboBox";
import { useTriggerToast } from "@/hooks/use-trigger-toast";
import { Link } from "react-router-dom";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useMyTeams } from "@/hooks/use-my-teams";

export type AddStrideFormDataType = z.infer<typeof formSchema>;

const formSchema = z
  .object({
    glass: z.number().min(0),
    plastic: z.number().min(0),
    metal: z.number().min(0),
    bags: z.number().min(0),
    cups: z.number().min(0),
    packaging: z.number().min(0),
    tissue: z.number().min(0),
    cigarette: z.number().min(0),
    others: z.number().min(0),
    team: z.optional(z.string()),
  })
  .refine((data) => Object.values(data).some((value) => value !== 0), {
    message: "Please select at least one item.",
    path: ["_errors"], // ['root'] doesnt work here lol......
  });

interface MutationArgs {
  newData: AddStrideFormDataType;
  jwtToken: string;
  location: Location;
}

const wasteCategories = [
  { name: "Glass", icon: "/glassBottle.png" },
  { name: "Plastic", icon: "/plasticBottle.png" },
  { name: "Metal", icon: "/metalCan.png" },
  { name: "Bags", icon: "/bag.png" },
  { name: "Cups", icon: "/cups.png" },
  { name: "Packaging", icon: "/packaging.png" },
  { name: "Tissue", icon: "/tissue.png" },
  { name: "Cigarette", icon: "/cigarette.png" },
  { name: "Others", icon: "/others.png" },
];

const getEmptyFormValues = () => {
  return {
    ...wasteCategories.reduce(
      (a, c) => ({ ...a, [c.name.toLowerCase()]: 0 }),
      {}
    ),
    team: "",
  };
};

const defaultValues = getEmptyFormValues();

export default function AddStridesPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { jwtToken } = useUser();
  const { location } = useGeoLocation();
  const triggerToast = useTriggerToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ newData, jwtToken, location }: MutationArgs) => {
      return submitStride(newData, jwtToken, location);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchMyStrides"] });
      queryClient.invalidateQueries({ queryKey: ["fetchAdminData"] });
      triggerToast("submit");
    },
    onError: (error) => {
      "submitted";
      console.error("Error submitting form:", error);
    },
  });

  const form = useForm<AddStrideFormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const {
    watch,
    setValue,
    setError,
    formState: { errors },
    reset,
  } = form;

  const onSubmit = (data: AddStrideFormDataType) => {
    const newData = {
      ...data,
      team: watchTeam,
    };
    if (Object.values(data).every((value) => value === 0)) {
      console.log("Form is empty, preventing submission");
      return;
    }
    if (!location) {
      triggerToast("formLocationError", { type: "destructive" });
      setError("root.location", {
        type: "custom",
        message: "Unable to get location for stride submission",
      });
    } else {
      const res = mutation.mutate({ newData, jwtToken, location });
      console.log("Form submitted successfully");
      reset(defaultValues);
      return res;
    }
  };

  const watchTeam = watch("team"); // Watch team selection
  const watchAllFields = watch();

  const totalItems = Object.values(watchAllFields)
    .filter((value) => typeof value === "number")
    .reduce((sum, value) => sum + (value || 0), 0);

  const handleCategoryClick = (category: string) => {
    const lowerCaseCategory = category.toLowerCase() as keyof z.infer<
      typeof formSchema
    >;
    const currentValue = watchAllFields[lowerCaseCategory] || 0;
    setValue(lowerCaseCategory, Number(currentValue) + 1);
    setSelectedCategory(lowerCaseCategory);
  };

  if (mutation.isPending) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 text-foreground h-full ">
      {/* Strides Summary */}
      <aside className="grid sm:flex p-5 py-0 sm:flex-col w-full md:w-56 md:p-6 md:pt-9 border-r ">
        <h2 className="text-sm font-semibold text-gray-900 pb-4 md:text-center ">
          Current Stride Summary
        </h2>
        {/* Points / Items / Time / Dist */}
        <div className="flex md:flex-col md:gap-4 md:items-center items-stretch text-center md:bg-gray-100 rounded-md py-3 pr-4 md:border-none md:pr-0">
          <div className="border-r-2 border-slate-200 flex-1 md:border-r-0">
            <Label className="font-normal text-gray-500">Points</Label>
            <p className="text-md md:text-xl font-bold ">{totalItems}</p>
          </div>
          <Separator className="hidden md:block" />
          <div className="border-r-2 border-slate-200 flex-1 md:border-r-0">
            <Label className="font-normal text-gray-500">Items</Label>
            <p className="text-md md:text-xl font-bold">{totalItems}</p>
          </div>
          <Separator className="hidden md:block" />
          <div className="border-r-2 border-slate-200 flex-1 md:border-r-0">
            <Label className="font-normal text-gray-500">Time</Label>
            <p className="text-md md:text-xl font-bold">15m</p>
          </div>
          <Separator className="hidden md:block" />
          <div className="flex-1">
            <Label className="font-normal text-gray-500">Distance</Label>
            <p className="text-md md:text-xl font-bold">0.1 km</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full p-4 pt-0 md:py-6 md:px-8 overflow-hidden ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 h-full "
          >
            <div className="flex-1 overflow-auto ">
              {/* Current stride */}
              <h1 className="text-sm pt-2 py-3 font-semibold text-gray-900  md:text-3xl md:font-bold md:mb-2 md:border-b">
                Current Stride
              </h1>
              <h2 className="hidden md:block text-sm pt-5 py-3 md:pt-1 md:pb-1 font-semibold text-gray-900 md:text-gray-600 md:text-lg md:font-bold md:mb-0">
                Waste categories
              </h2>
              <Card className="border-0 shadow-none md:shadow-sm md:border-2 ">
                <CardContent className="p-0 md:p-4 grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:pt-4 bg-gray-100 rounded-xl border-0 shadow-none md:bg-gray-50 ">
                  {wasteCategories.map((category) => (
                    <FormField
                      key={category.name}
                      control={form.control}
                      name={
                        /*  https://www.typescriptlang.org/docs/handbook/2/keyof-types.html */
                        category.name.toLowerCase() as keyof z.infer<
                          typeof formSchema
                        >
                      }
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Button
                              type="button"
                              // variant={field.value > 0 ? "default" : "outline"}
                              variant={"outline"}
                              className="h-24 w-full flex bg-slate-100 flex-col justify-center items-center rounded-lg relative shadow-md"
                              onClick={() => handleCategoryClick(category.name)}
                            >
                              <img
                                src={category.icon}
                                alt={category.name}
                                className="w-8 h-8 mb-2"
                              />
                              <span className="text-sm ">{category.name}</span>
                              {typeof field.value === "number" &&
                                field.value > 0 && (
                                  <Badge
                                    className="absolute top-1 right-1 bg-primary"
                                    variant="default"
                                  >
                                    {field.value}
                                  </Badge>
                                )}
                            </Button>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                </CardContent>
              </Card>
              {errors._errors && (
                <div className="text-destructive">{errors._errors.message}</div>
              )}
              {/* Quantity */}
              <h2 className=" text-sm pt-5 py-3 md:pt-2 md:pb-1 font-semibold text-gray-900 md:text-gray-600 md:text-lg md:font-bold md:mb-0">
                Quantity
              </h2>
              <Card>
                <CardContent className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        selectedCategory &&
                        setValue(
                          selectedCategory as keyof z.infer<typeof formSchema>,
                          Math.max(
                            0,
                            (watchAllFields[selectedCategory] || 0) - 1
                          )
                        )
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <FormField
                      key={selectedCategory}
                      control={form.control}
                      /*  https://www.typescriptlang.org/docs/handbook/2/keyof-types.html */
                      name={
                        selectedCategory as keyof z.infer<typeof formSchema>
                      }
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
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
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        selectedCategory &&
                        setValue(
                          selectedCategory as keyof z.infer<typeof formSchema>,
                          (watchAllFields[
                            selectedCategory as keyof z.infer<typeof formSchema>
                          ] || 0) + 1
                        )
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <FormLabel>
                      {selectedCategory
                        ? selectedCategory.charAt(0).toUpperCase() +
                          selectedCategory.slice(1)
                        : "Select a category"}
                    </FormLabel>
                  </div>
                </CardContent>
              </Card>
              {/* Add to team */}
              <h2 className=" text-sm pt-5 py-3 md:pt-2 md:pb-1 font-semibold text-gray-900 md:text-gray-600 md:text-lg md:font-bold md:mb-0">
                Team
              </h2>
              <TeamComboBox
                value={watchTeam}
                setValue={(value) => setValue("team", value)}
                fetchTeamFn={useMyTeams}
              />
              {/* Actions segment */}
            </div>
            <div className="flex space-x-4 mt-auto ">
              <Button
                asChild
                type="button"
                variant="outline"
                className="flex-1"
              >
                <Link to="/">End Stride</Link>
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Saving..." : "Save Pickup"}
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
}
