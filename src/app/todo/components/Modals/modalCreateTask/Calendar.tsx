import React, { useEffect } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import { FormControl } from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const CalendarField = React.forwardRef<
  HTMLDivElement,
  ControllerRenderProps<
    {
      title: string;
      description: string;
      dueDate: Date;
    },
    "dueDate"
  >
>(({ value, onChange }, ref) => {
  useEffect(() => {
    if (!value) {
      onChange(new Date());
    }
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl ref={ref}>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            {value ? format(value, "PPP") : format(new Date(), "PPP")}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value || new Date()}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
});

CalendarField.displayName = "CalendarField";

export default CalendarField;
