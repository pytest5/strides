import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const FrostedCardWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Card className="bg-white/75 p-4 backdrop-blur-md border-white/20 shadow-md">
      {children}
    </Card>
  );
};
