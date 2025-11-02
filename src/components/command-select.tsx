import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

import { ChevronsUpDownIcon } from "lucide-react";
import { Button } from "./ui/button";
import { 
    CommandEmpty, 
    CommandInput, 
    CommandItem, 
    CommandList,
    Command 
} from "./ui/command";
import { Dialog } from "./ui/dialog";

interface Props {
    options: Array<{
        id:string;
        value: string;
        children: ReactNode;
    }>;
    onSelect: (value:string) => void;
    onSearch: (value:string) => void;
    value: string;
    placeholder?: string;
    isSearchable?: boolean;
    className?: string;
};

export const CommandSelect = ({
    options,
    onSelect,
    onSearch,
    value,
    placeholder = "Select an option",
    isSearchable = true,
    className
}: Props) => {

    const [open, setOpen] = useState(false);
    // const [search, setSearch] = useState("");
    const selectedOptions = options.find((option) => option.value === value);

    const handleOpenChange = (value: boolean) => {
        onSearch?.("");
        setOpen(value);
    };

    return (
        <>
            <Button
                
                type="button"
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground", selectedOptions && "!text-foreground")}
                onClick={() => setOpen(true)}
            >
                {selectedOptions?.children ?? placeholder}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <CommandInput
                    placeholder="Search..."
                    // value={value}
                    onValueChange={onSearch}
                />
                <CommandList>
                    <CommandEmpty>
                        No results.
                    </CommandEmpty>
                    {options.map((option) => (
                        <CommandItem
                            key={option.id}
                            value={option.value}
                            onSelect={() => {
                                onSelect(option.value);
                                setOpen(false);
                            }}
                        >
                            {option.children}
                        </CommandItem>
                    ))}
                </CommandList>
            </Dialog>
        </>
    )

}