// "use client";

import countries from "world-countries";
import ReactCountryFlag from "react-country-flag";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Label } from "../ui/label";
// import { Controller } from "react-hook-form";
// const Country = ({
//   name,
//   label,
//   placeholder,
//   control,
//   error,
//   required = false,
// }: SelectFieldProps) => {
const country = countries.map((country) => ({
  label: country.name.common,
  value: country.cca2, // ISO country code (US, PK, IN)
}));

//   return (
//     <div className="space-y-2">
//       <Label htmlFor={name}>{label}</Label>

//       <Controller
//         name={name}
//         control={control}
//         rules={{
//           required: required ? `Please select ${label.toLowerCase()}` : false,
//         }}
//         render={({ field }) => (
//           <Select value={field.value} onValueChange={field.onChange}>
//             <SelectTrigger className="select-trigger">
//               <SelectValue placeholder={placeholder} />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-800 border-gray-600 text-white">
//               {country.map((option) => (
//                 <SelectItem
//                   value={option.value}
//                   key={option.value}
//                   className="focus:bg-gray-600 focus:text-white"
//                 >
//                   <span className="flex items-center gap-2">
//                     {" "}
//                     <ReactCountryFlag
//                       svg
//                       countryCode={option.value}
//                       style={{ width: "1.2em", height: "1.2em" }}
//                     />
//                     {option.label}
//                     <Popover>
//                       <PopoverTrigger>Open</PopoverTrigger>
//                       <PopoverContent>
//                         Place content for the popover here.
//                       </PopoverContent>
//                     </Popover>
//                   </span>
//                 </SelectItem>
//               ))}
//             </SelectContent>
//             {error && <p className="text-sm text-red-500">{error.message}</p>}
//           </Select>
//         )}
//       />
//     </div>
//   );
// };

// export default Country;

import { Controller } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

const Country = ({
  name,
  label,
  options,
  control,
  placeholder,
  error,
  required = false,
}: SelectFieldProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={name}>{label}</Label>
        <Controller
          name={name}
          control={control}
          rules={{
            required: required ? `Please select ${label.toLowerCase()}` : false,
          }}
          render={({ field }) => (
            <div className="space-y-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    <span className="flex items-center gap-2">
                      {field.value ? (
                        <>
                          <ReactCountryFlag
                            svg
                            countryCode={field.value}
                            style={{ width: "1.2em", height: "1.2em" }}
                          />
                          {country.find((o) => o.value === field.value)?.label}
                        </>
                      ) : (
                        <span className="text-muted-foreground">
                          {placeholder}
                        </span>
                      )}
                    </span>

                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder={`Search ${label.toLowerCase()}...`}
                    />
                    <CommandEmpty>No result found.</CommandEmpty>

                    <CommandGroup>
                      {country.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.label}
                          onSelect={() => field.onChange(option.value)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value === option.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          <div className="flex items-center gap-7">
                            <ReactCountryFlag
                              svg
                              countryCode={option.value}
                              style={{ width: "1.2em", height: "1.2em" }}
                            />

                            {option.label}
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              {error && <p className="text-sm text-red-500">{error.message}</p>}
            </div>
          )}
        />
      </div>
    </>
  );
};

export default Country;
