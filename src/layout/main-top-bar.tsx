"use client";

import { type ReactNode, useState } from "react";
import { Input, TextField, Link } from "~/components/react-aria-components";
import {
  FaArrowRightToBracket,
  FaBars,
  FaBook,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { twJoin } from "tailwind-merge";
import Logo from "~/assets/images/cs12-logo.svg";
import Button from "~/components/button";
import twMerge from "~/lib/tw-merge";
import { useMainLayoutStore } from "~/components/providers/main-layout-store-provider";
import MainThemeSwitch from "./main-theme-switch";

type Props = {
  isBlured?: boolean;
};

const PATH_ICONS: Record<string, ReactNode> = {
  "/": <FaBook size={16} />,
  "/user-panel": <FaBars size={16} />,
};

function MainTopbar(props: Props) {
  const { isBlured = false } = props;
  const [focused, setFocused] = useState(false);

  const sideBarOpen = useMainLayoutStore((state) => state.isSideBarOpen);
  const toggleIsSideBarOpen = useMainLayoutStore(
    (state) => state.toggleIsSideBarOpen,
  );

  const pathname = usePathname();
  const matchedIcon = PATH_ICONS[pathname];

  return (
    <header
      className={twJoin(
        "h-17.5 rounded-xl bg-crust mt-8",
        "flex items-center px-4",
        "gap-3.5 [&>*]:shrink-0 lg:px-7.5",
        "relative z-11 select-none",
        "[&>button]:text-overlay-1",
        "z-11 ",
      )}
    >
      <Logo />

      <div
        className={twJoin(
          "flex items-center grow gap-3.5",
          isBlured && "blur-[4px] pointer-events-none",
        )}
      >
        <nav className="hidden text-body-sm mr-3.5 lg:block">
          <ul className="flex gap-7">
            <li>
              <Link href="#" className="cursor-default select-none">
                جوخه
              </Link>
            </li>
            <li>
              <Link href="#" className="cursor-default select-none">
                بمان تا با
              </Link>
            </li>
            <li>
              <Link href="#" className="cursor-default select-none">
                دوباره
              </Link>
            </li>
            <li className="text-maroon">
              <Link href="#" rel="help" className="cursor-default select-none">
                کشک
              </Link>
            </li>
          </ul>
        </nav>

        <div aria-hidden className="grow" />

        <div className="flex gap-x-4">
          {matchedIcon && (
            <Button
              variant="none"
              onPress={() => toggleIsSideBarOpen()}
              className={twMerge(
                "p-3 rounded-lg lg:hidden select-none bg-base",
                sideBarOpen && "bg-sapphire text-crust",
              )}
            >
              {matchedIcon}
            </Button>
          )}
          <TextField className="relative w-10 h-10">
            <Input
              aria-label="سرچ بار"
              onBlur={() => setFocused(false)}
              onFocus={() => setFocused(true)}
              placeholder={focused ? "جستوجو کنید" : ""}
              className={twJoin(
                "w-10 h-10 rounded-lg bg-base absolute left-0",
                "focus:p-2.5 placeholder:text-xs text-xs placeholder:text-text",
                "focus:outline-none focus:w-[245px] lg:focus:w-[660px]",
                "transition-all duration-200 ease-in-out cursor-pointer",
              )}
            />
            <FaMagnifyingGlass
              size={16}
              className={twJoin(
                "absolute top-1/2 left-1/2 -translate-x-1/2",
                "-translate-y-1/2 cursor-pointer pointer-events-none",
              )}
            />
          </TextField>

          <Button
            variant="none"
            aria-label="دکمه ورود"
            className="p-3 rounded-lg cursor-default bg-base"
          >
            <FaArrowRightToBracket size={16} />
          </Button>
        </div>

        <span className="select-none">
          <MainThemeSwitch />
        </span>
      </div>
    </header>
  );
}

export default MainTopbar;
