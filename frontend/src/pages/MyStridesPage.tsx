import * as React from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFetch } from "@/hooks/use-fetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeStride, editStride } from "@/services/stridesService";
import { useUser } from "@/components/UserProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { TeamComboBox } from "@/components/TeamComboBox";
import { useTriggerToast } from "@/hooks/use-trigger-toast";
import LoadingSpinner from "@/components/LoadingSpinner";
import convertDateTime from "@/utils/convertDateTime";

interface Stride {
  stride_id: number;
  username: string;
  country: string;
  distance: number;
  duration: number;
  team: string;
  team_id: number | null;
  created_at: string;
}
interface UserStrideData {
  created_at: string; // "2024-09-28T00:27:20.058Z"
  distance: number; // 10
  duration: number; // 3
  id: number; // 220
  team_name: string; // "ele1"
  stride_id: number;
}

export type EditStrideFormType = z.infer<typeof formSchema>;

const formSchema = z.object({
  distance: z.number().min(0, {
    message: "Distance must be a positive number.",
  }),
  duration: z.number().min(0, {
    message: "Duration must be a positive number.",
  }),
  team_id: z.optional(z.number()).nullable(),
});

function EditStrideDialog({
  stride,
  onSave,
}: {
  stride: Stride;
  onSave: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const { jwtToken } = useUser();
  const queryClient = useQueryClient();
  const triggerToast = useTriggerToast();

  const form = useForm<EditStrideFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      distance: stride.distance,
      duration: stride.duration,
      team_id: stride.team_id || null,
    },
  });

  const watchTeamId = form.watch("team_id");

  console.log(watchTeamId);
  console.log(form.formState.errors);
  const { mutate: updateMutation } = useMutation({
    mutationFn: editStride,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchMyStrides"] });
      onSave();
      triggerToast("submit");
      setOpen(false);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("submitting", stride, values);
    if (!jwtToken) {
      throw new Error("Invalid token, unable to update stride");
    }
    console.log("submitting edit form", {
      strideData: { ...stride, ...values, team_id: Number(values.team_id) },
      jwtToken,
    });
    updateMutation({
      strideData: { ...stride, ...values, team_id: Number(values.team_id) },
      jwtToken,
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Edit
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Stride</DialogTitle>
          <DialogDescription>
            Make changes to the stride here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-8"
          >
            <FormField
              control={form.control}
              name="distance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distance (m)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Distance"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.errors && (
              <div className="text-destructive">
                {form.formState.errors?.distance?.message}
              </div>
            )}
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (mins)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Duration"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.errors && (
              <div className="text-destructive">
                {form.formState.errors?.duration?.message}
              </div>
            )}
            <div className="space-y-2">
              <h2 className="text-sm pb-0 font-semibold text-gray-900 md:pb-4 md:text-xl md:font-bold md:mb-0">
                Team
              </h2>
              <TeamComboBox
                value={watchTeamId}
                setValue={(value) => {
                  console.log("setting value", value);
                  form.setValue("team_id", Number(value));
                }}
                variant="label"
              />
            </div>
            {form.formState.errors && (
              <div className="text-destructive">
                {form.formState.errors?.team?.message}
              </div>
            )}
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function MyStridesPage() {
  const { jwtToken, user } = useUser();
  const { data, isPending } = useFetch<UserStrideData[]>(
    `/api/strides/${user?.id}`,
    ["fetchMyStrides"],
    {
      token: jwtToken,
      enabled: !!user,
    }
  );

  console.log(data);

  /* {
    "id": 260,
    "created_at": "2024-10-04T16:41:02.598Z",
    "distance": 10,
    "address": "109b Bidadari Park Drive",
    "duration": 3,
    "team_name": "cat"
} */

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: removeStride,
    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: ["fetchAdminData"],
          exact: true,
          refetchType: "active",
        },
        { throwOnError: true, cancelRefetch: true }
      );
    },
  });

  const handleDelete = (strideId: number) => {
    if (!jwtToken) {
      throw new Error("Invalid token, unable to delete stride");
    }
    mutate({ strideId, jwtToken });
  };

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <Card className="w-full h-full flex flex-col ">
      <CardHeader className="px-3 md:px-6">
        {/* <h1 className="text-2xl border-b-2 pb-3 mb-5">Admin</h1> */}
        <CardTitle>My Strides</CardTitle>
        <CardDescription>
          Stay on top of your contributions to the community.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 px-3 md:px-6 flex-grow min-h-0">
        <div className="rounded-md border overflow-x-auto relative h-full ">
          <table className="w-full text-sm">
            <thead>
              <tr className="sticky top-0 z-30">
                <th className="sticky left-0 bg-muted/50 px-4 py-3 text-left font-medium text-muted-foreground">
                  Stride
                </th>
                {[
                  "Address",
                  "Distance (m)",
                  "Duration (mins)",
                  "Team",
                  "Created At",
                ].map((header) => (
                  <th
                    key={header}
                    className="bg-muted/50 px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map((stride) => (
                <tr key={stride.id} className="border-t">
                  <td className="sticky left-0 bg-background px-4 py-3 font-medium ">
                    {stride.id}
                  </td>
                  {/* <td className="px-4 py-3 whitespace-nowrap">
                      {stride.username}
                    </td> */}
                  {/* <td className="px-4 py-3 whitespace-nowrap">
                      {stride.country}
                    </td> */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    {stride.address}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {stride.distance}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {stride.duration}
                  </td>
                  <td className="px-4 py-3 max-w-[200px] truncate">
                    {stride.team_name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {convertDateTime(stride.created_at)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <EditStrideDialog
                          stride={stride}
                          onSave={() =>
                            queryClient.invalidateQueries({
                              queryKey: ["fetchAdminData"],
                            })
                          }
                        />
                        {/* <DropdownMenuItem>Duplicate</DropdownMenuItem> */}
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuItem>Archive</DropdownMenuItem> */}
                        <DropdownMenuItem
                          onClick={() => {
                            handleDelete(stride.stride_id);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      {!data && (
        <div className="mb-6 mx-4 py-3 text-sm border-b text-center text-muted-foreground">
          Add a stride!
        </div>
      )}
      <CardFooter className="flex items-center justify-between px-3 md:px-6">
        <p className="text-sm text-muted-foreground">
          Showing <strong>{data?.length}</strong> of{" "}
          <strong>{data?.length}</strong> strides
        </p>
        <div className="flex items-center space-x-2">
          {/* <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button> */}
        </div>
      </CardFooter>
    </Card>
  );
}
