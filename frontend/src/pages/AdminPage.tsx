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
  FormDescription,
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

interface Stride {
  strides_id: number;
  username: string;
  country: string;
  distance: number;
  duration: number;
  team: string;
  created_at: string;
}
export type EditStrideFormType = z.infer<typeof formSchema>;

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
  distance: z.number().min(0, {
    message: "Distance must be a positive number.",
  }),
  duration: z.number().min(0, {
    message: "Duration must be a positive number.",
  }),
  team: z.optional(z.string()),
  //   team: z.string().min(1, {
  //     message: "Team must be at least 2 characters.",
  //   }),
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
      username: stride.username,
      country: stride.country,
      distance: stride.distance,
      duration: stride.duration,
      team: stride.team,
    },
  });

  console.log("errors", form.formState.errors);

  const watchTeam = form.watch("team");

  const { mutate: updateMutation } = useMutation({
    mutationFn: editStride,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchAdminData"] });
      onSave();
      triggerToast("submit");
      setOpen(false);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("submitting", values);
    if (!jwtToken) {
      throw new Error("Invalid token, unable to update stride");
    }
    console.log("submitting edit form", {
      strideData: { ...stride, ...values },
      jwtToken,
    });
    updateMutation({ strideData: { ...stride, ...values }, jwtToken });
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
            {/* <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the user's display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.errors && (
              <div className="text-destructive">
                {form.formState.errors?.username?.message}
              </div>
            )} */}
            {/* <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.errors && (
              <div className="text-destructive">
                {form.formState.errors?.country?.message}
              </div>
            )} */}
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
                value={watchTeam}
                setValue={(value) => {
                  console.log("setting value", value);
                  form.setValue("team", value);
                }}
                variant="label"
              />
            </div>
            {form.formState.errors && (
              <div className="text-destructive">
                {form.formState.errors?.team?.message}
              </div>
            )}
            {/* <FormField
              control={form.control}
              name="team"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team</FormLabel>
                  <FormControl>
                    <Input placeholder="Team" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function AdminPage() {
  const { data, isPending } = useFetch("/api/admin", ["fetchAdminData"]);
  console.log(data);
  const { jwtToken } = useUser();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess, error } = useMutation({
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
    <Card className="w-full h-full ">
      <CardHeader className="px-3 md:px-6">
        {/* <h1 className="text-2xl border-b-2 pb-3 mb-5">Admin</h1> */}
        <CardTitle>Strides</CardTitle>
        <CardDescription>
          View and manage strides across different locations.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 px-3 md:px-6">
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto relative">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="sticky left-0 z-20 bg-muted/50 px-4 py-3 text-left font-medium text-muted-foreground">
                    Strides ID
                  </th>
                  {[
                    "Name",
                    "Country",
                    "Distance (m)",
                    "Duration (mins)",
                    "Team",
                    "Created At",
                    "Actions",
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
                  <tr key={stride.strides_id} className="border-t">
                    <td className="sticky left-0 z-10 bg-background px-4 py-3 font-medium">
                      {stride.strides_id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {stride.username}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {stride.country}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {stride.distance}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {stride.duration}
                    </td>
                    <td className="px-4 py-3 max-w-[200px] truncate">
                      {stride.team}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {stride.created_at}
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
                              handleDelete(stride.strides_id);
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
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between px-3 md:px-6">
        <p className="text-sm text-muted-foreground">
          Showing <strong>{data?.length}</strong> of{" "}
          <strong>{data?.length}</strong> strides
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
