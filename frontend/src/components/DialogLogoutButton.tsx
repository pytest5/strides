import { Button } from "@/components/ui/button";
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
import { useNavigate } from "react-router";
import { useUser } from "./UserProvider";
import { useTriggerToast } from "@/hooks/use-trigger-toast";

export function DialogLogoutButton({
  className,
  text,
}: {
  className?: string;
  text: string;
}) {
  const navigate = useNavigate();
  const { setUser, logout } = useUser();
  const triggerToast = useTriggerToast();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
          {text}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Logout Confirmation</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to log out? You will need to enter your password
          to log back in.
        </DialogDescription>
        <DialogFooter className="flex gap-2 ">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={() => {
              logout();
              setUser(null);
              navigate("/");
              triggerToast("logout");
            }}
          >
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
