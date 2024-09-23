import { CopyIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SlidersHorizontal } from "lucide-react";

export function DialogFilterButton() {
  return (
    <Dialog>
      {/* className="p-2 hover:bg-gray-700 rounded-full transition-colors" */}
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="">
          <SlidersHorizontal color={"white"} size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select a time period</DialogTitle>
          <DialogDescription>
            Map data will be filtered by selected time period
          </DialogDescription>
        </DialogHeader>
        <Select onValueChange={(e) => window.alert(e)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="choose a time period.." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pre">Pre</SelectItem>
            <SelectItem value="post">Post</SelectItem>
          </SelectContent>
        </Select>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="bg-gray-800 text-white"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
