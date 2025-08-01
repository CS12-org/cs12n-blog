import { Main } from "~/layout/Main";
import Vector404 from "../assets/images/404.svg?react";

function NotFoundPage() {
  return (
    <main className="flex flex-col gap-y-4 items-center justify-center text-white text-xl lg:text-3xl w-full  p-4 pl-6 pr-10  md:pl-7.5 md:pr-14 bg-crust rounded-xl font-extrabold ">
      <h2 className=" text-flamingo text-xl  md:text-headline-lg ">
        {" "}
        اوپس! فردین صفحه ات رو خورد!
      </h2>
      <Vector404 className="w-full h-auto  " aria-label="صفحه پیدا نشد" />
      <h2 className="text-lg  md:text-[32px]">
        صفحه پیدا <span className="text-maroon ">نشد</span> <sup>!</sup>!
        <sub>!</sub>
      </h2>
      <p className="text-xs lg:text-sm font-normal">
        {" "}
        صفحه ای که شما به دنبالش میگردید در حال حاضر وجود ندارد.
      </p>
    </main>
  );
}

export default NotFoundPage;
