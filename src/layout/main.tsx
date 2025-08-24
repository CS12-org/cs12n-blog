import type { ReactNode } from "react";
import MainBottombar from "./main-bottom-bar";
import MainFooter from "./main-footer";
import MainTopbar from "./main-top-bar";
import Footer from "~/components/footer";

type Props = { children?: ReactNode };

function Main(props: Props) {
  const { children } = props;

  return (
    <div className="px-6">
      <div className="mx-auto space-y-5 pb-5 max-w-sm md:max-w-140 lg:max-w-235">
        <MainTopbar isBlured={true} />
        <main>{children}</main>
        <MainBottombar />
        <MainFooter />
        <Footer />
      </div>
    </div>
  );
}

export default Main;
