import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Renders a navigation element prepared for breadcrumb composition with appropriate accessibility attributes and a data-slot.
 *
 * @param props - Props to spread onto the underlying `<nav>` element.
 * @returns The breadcrumb navigation element with `aria-label="breadcrumb"` and `data-slot="breadcrumb"`.
 */
function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

/**
 * Renders the breadcrumb list container as an ordered list element.
 *
 * Renders an <ol> element intended to contain breadcrumb items, applies default breadcrumb layout and typography classes, merges any provided `className`, and forwards all other props onto the element.
 *
 * @returns The rendered `<ol>` element configured as the breadcrumb list
 */
function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      )}
      {...props}
    />
  )
}

/**
 * Render a breadcrumb list item with default layout classes and a `data-slot="breadcrumb-item"` attribute.
 *
 * @returns A `<li>` element configured as a breadcrumb item, combining default inline-flex layout classes with any provided `className` and spreading remaining props.
 */
function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

/**
 * Render a breadcrumb link element that optionally delegates rendering to a child component.
 *
 * @param asChild - If present, render the provided child element instead of an anchor.
 * @param className - Additional CSS classes to merge with the default breadcrumb link styles.
 * @returns The rendered breadcrumb link element with `data-slot="breadcrumb-link"` and merged styling.
 */
function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  )
}

/**
 * Renders the current breadcrumb item as a non-interactive page indicator.
 *
 * Produces a <span> with data-slot="breadcrumb-page", role="link", aria-disabled="true", and aria-current="page"; merges default typography classes with any provided `className` and forwards remaining props to the element.
 *
 * @returns The span element representing the current breadcrumb page.
 */
function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  )
}

/**
 * Render a breadcrumb separator list item.
 *
 * Renders a <li> with presentation semantics and a default chevron icon when no children are provided.
 *
 * @param children - Optional custom separator content; if omitted, a `ChevronRight` icon is rendered.
 * @param className - Additional CSS classes to merge with the default sizing class.
 * @returns A list item element used as a breadcrumb separator.
 */
function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

/**
 * Renders an ellipsis element used to indicate truncated breadcrumb items.
 *
 * The element is a presentational span with data-slot="breadcrumb-ellipsis", role="presentation", and aria-hidden="true".
 * It contains a MoreHorizontal icon and a visually hidden "More" label for screen readers.
 *
 * @param className - Additional CSS classes to merge with the component's default styling
 * @returns A span element representing the breadcrumb ellipsis control
 */
function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}