/**
 * @fileoverview Pagination component for navigating through pages of content.
 * Provides a complete set of pagination controls including navigation buttons,
 * page links, and ellipsis indicators.
 */

import * as React from "react";
import { Link } from "~/components/react-aria-components";
import { LuChevronLeft, LuChevronRight, LuEllipsis } from "react-icons/lu";
import twMerge from "~/lib/tw-merge";

/**
 * Props for the main Pagination navigation component.
 * Extends all standard HTML nav element props.
 */
type PaginationProps = React.ComponentProps<"nav">;

/**
 * Main pagination navigation wrapper component.
 * Provides the semantic structure and accessibility for pagination controls.
 *
 * @param props - All standard nav element props including className
 * @returns A nav element with proper pagination semantics
 *
 * @example
 * ```tsx
 * <Pagination>
 *   <PaginationContent>
 *     <PaginationItem>
 *       <PaginationPrevious href="/page/1" />
 *     </PaginationItem>
 *   </PaginationContent>
 * </Pagination>
 * ```
 */
function Pagination(props: PaginationProps) {
  const { className, ...other } = props;

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={twMerge("flex justify-center", className)}
      {...other}
    />
  );
}

/**
 * Props for the PaginationContent list container.
 * Extends all standard HTML ul element props.
 */
type PaginationContentProps = React.ComponentProps<"ul">;

/**
 * Container for pagination items, rendered as an unordered list.
 * Provides the layout structure for pagination controls.
 *
 * @param props - All standard ul element props including className
 * @returns A ul element styled for pagination content
 *
 * @example
 * ```tsx
 * <PaginationContent>
 *   <PaginationItem>
 *     <PaginationLink href="/page/1">1</PaginationLink>
 *   </PaginationItem>
 * </PaginationContent>
 * ```
 */
function PaginationContent(props: PaginationContentProps) {
  const { className, ...other } = props;
  return (
    <ul className={twMerge("flex items-center gap-1", className)} {...other} />
  );
}

/**
 * Props for individual pagination items.
 * Extends all standard HTML li element props.
 */
type PaginationItemProps = React.ComponentProps<"li">;

/**
 * Individual pagination item wrapper, rendered as a list item.
 * Used to contain pagination links, buttons, or other controls.
 *
 * @param props - All standard li element props including className
 * @returns A li element styled for pagination items
 *
 * @example
 * ```tsx
 * <PaginationItem>
 *   <PaginationLink href="/page/2">2</PaginationLink>
 * </PaginationItem>
 * ```
 */
function PaginationItem(props: PaginationItemProps) {
  const { className, ...other } = props;

  return (
    <li
      className={twMerge("size-6 flex items-center justify-center", className)}
      {...other}
    />
  );
}

/**
 * Props for pagination links.
 * Extends Link component props with an optional isActive state.
 */
type PaginationLinkProps = {
  /** Whether this link represents the currently active page */
  isActive?: boolean;
} & Omit<React.ComponentProps<typeof Link>, "className"> & {
    className?: string;
  };

/**
 * Clickable pagination link component.
 * Renders as a Link component with proper accessibility attributes.
 *
 * @param props - Link props plus optional isActive boolean
 * @returns A Link element with pagination-specific accessibility
 *
 * @example
 * ```tsx
 * <PaginationLink href="/page/2" isActive={currentPage === 2}>
 *   2
 * </PaginationLink>
 * ```
 */
function PaginationLink(props: PaginationLinkProps) {
  const { className, isActive, ...other } = props;
  return (
    <Link
      className={className}
      aria-current={isActive ? "page" : undefined}
      {...other}
    />
  );
}

/**
 * Props for the previous page navigation button.
 * Extends all PaginationLink props.
 */
type PaginationPreviousProps = React.ComponentProps<typeof PaginationLink>;

/**
 * Previous page navigation button.
 * Displays a chevron left icon with accessibility text in Persian.
 *
 * @param props - All PaginationLink props including href
 * @returns A PaginationLink styled as a previous button
 *
 * @example
 * ```tsx
 * <PaginationPrevious href="/page/1" />
 * ```
 */
function PaginationPrevious(props: PaginationPreviousProps) {
  const { className, ...other } = props;

  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={className}
      {...other}
    >
      <span className="sr-only">قبل</span>
      <LuChevronLeft size={16} />
    </PaginationLink>
  );
}

/**
 * Props for the next page navigation button.
 * Extends all PaginationLink props.
 */
type PaginationNextProps = React.ComponentProps<typeof PaginationLink>;

/**
 * Next page navigation button.
 * Displays a chevron right icon with accessibility text in Persian.
 *
 * @param props - All PaginationLink props including href
 * @returns A PaginationLink styled as a next button
 *
 * @example
 * ```tsx
 * <PaginationNext href="/page/3" />
 * ```
 */
function PaginationNext(props: PaginationNextProps) {
  const { className, ...other } = props;

  return (
    <PaginationLink
      aria-label="Go to next page"
      className={className}
      {...other}
    >
      <LuChevronRight size={16} />
      <span className="sr-only">بعد</span>
    </PaginationLink>
  );
}

/**
 * Props for the pagination ellipsis indicator.
 * Extends all standard HTML span element props.
 */
type PaginationEllipsisProps = React.ComponentProps<"span">;

/**
 * Ellipsis indicator for pagination.
 * Shows "..." to indicate there are more pages between displayed page numbers.
 * Includes Persian screen reader text for accessibility.
 *
 * @param props - All standard span element props including className
 * @returns A span element with ellipsis icon and accessibility text
 *
 * @example
 * ```tsx
 * <PaginationEllipsis />
 * ```
 */
function PaginationEllipsis(props: PaginationEllipsisProps) {
  const { className, ...other } = props;

  return (
    <span aria-hidden className={className} {...other}>
      <LuEllipsis size={16} />
      <span className="sr-only">صفحات بیشتر</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
