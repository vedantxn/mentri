"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Renders a responsive table wrapper and a table element with data-slot attributes and merged class names.
 *
 * @param className - Additional class names applied to the table element
 * @param props - Remaining props forwarded to the underlying `table` element
 * @returns The table element wrapped in a horizontally scrollable container
 */
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

/**
 * Renders a table header element with a data-slot for styling hooks and default row-bottom borders.
 *
 * @param className - Additional class names to merge with the default header styling
 * @returns The `thead` element with `data-slot="table-header"` and the composed `className`
 */
function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

/**
 * Renders a tbody element used for table body content with styling hooks.
 *
 * @returns A `tbody` element with a data-slot of "table-body", classes that remove the bottom border from the last row, and any provided `className`.
 */
function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

/**
 * Renders the table footer element used by the table components, with default footer styling and a styling hook.
 *
 * The element receives a data-slot of "table-footer", merges any provided `className` with the component's default footer classes, and spreads remaining props onto the underlying `tfoot`.
 *
 * @param className - Additional class names merged with the component's default footer classes
 * @returns A `tfoot` element with composed classes, `data-slot="table-footer"`, and forwarded props
 */
function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table row element with standardized styling and a data-slot attribute for styling hooks.
 *
 * @returns A `<tr>` element with the component's design-system classes applied and all received props forwarded.
 */
function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table header cell configured for the design system with the `data-slot="table-head"` attribute and default header styles.
 *
 * @returns A `th` element with `data-slot="table-head"`, a composed header `className`, and all provided props forwarded to the element.
 */
function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table cell element with consistent spacing and checkbox-aware styles.
 *
 * @returns A `td` element with default cell styling (padding, vertical alignment, no-wrap) that adjusts layout when it contains a checkbox and forwards all received props.
 */
function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table caption element with the component's standard caption styling and slot attribute.
 *
 * @returns A `caption` element with preset caption classes, a `data-slot="table-caption"` attribute, and any provided props applied.
 */
function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}