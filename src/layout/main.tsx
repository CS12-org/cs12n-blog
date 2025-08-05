import type { ReactNode } from "react";
import MainBottombar from "./main-bottom-bar";
import MainFooter from "./main-footer";
import MainTopbar from "./main-top-bar";

type Props = { children?: ReactNode };

function Main(props: Props) {
  const { children } = props;

  return (
    <div className="px-6">
      <div className="max-w-sm lg:max-w-235 mx-auto space-y-5 pb-5">
        <MainTopbar isBlured={true} />
        <main>{children}</main>
        <MainBottombar />
        <MainFooter />
      </div>
    </div>
  );
}

export default Main;
