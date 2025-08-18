import { Text } from "~/components/react-aria-components";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import Button from "~/components/button";

function PostNavigation() {
  return (
    <section className=" flex text-text divide-x-2 divide-dashed divide-surface-2  w-full">
      <div className="grid grid-rows-2 grid-cols-7 justify-start gap-y-[10px] w-full bg-crust rounded-r-[10px] lg:pr-[50px] pr-[10px] py-[10px] lg:py-[20px] ">
        <Button className="h-[40px] w-[40px] row-start-1 row-end-1 col-start-1 col-end-1 bg-mauve rounded-full flex items-center justify-center self-center">
          <FaArrowRightLong className="text-[25px] text-[#351955]" />
        </Button>
        <Text className="row-start-1 row-end-1 lg:col-start-2 lg:col-end-3 col-start-3 font-extrabold lg:text-[20px] text-[16px] self-center justify-self-start self-center ">
          بعدی
        </Text>
        <Text className="lg:text-[16px] truncate text-[12px] row-start-2  row-end-2 h-auto col-start-1 col-end-7 bg-mantle rounded-[5px] border-r-[3px] border-sapphire  lg:py-[5px] p-[5px]  self-center">
          قسمت سوم : بش اسکریپت درک فایل سیستم
        </Text>
      </div>
      <div className="grid grid-rows-2 grid-cols-7 justify-end gap-y-[10px] w-full bg-crust rounded-l-[10px] lg:pl-[50px] pl-[10px] py-[10px] lg:py-[20px]">
        <Button className="h-[40px] row-start-1 row-end-1 lg:col-start-7 col-start-6 justify-self-end  self-center col-end-8 w-[40px]  bg-mauve rounded-full flex items-center justify-center ">
          <FaArrowLeftLong className="text-[25px] text-[#351955]" />
        </Button>
        <Text className="row-start-1 row-end-1 lg:col-start-6 lg:col-end-7 col-start-4 col-end-6 justify-self-end font-extrabold lg:text-[20px] text-[16px] self-center  ">
          قبلی
        </Text>
            <Text className="lg:text-[16px] truncate text-[12px] h-auto row-start-2  row-end-2 col-start-2 col-end-8 bg-mantle rounded-[5px] border-l-[3px] border-sapphire  lg:py-[5px] p-[5px] self-center">
          قسمت اول : بش اسکریپت کامند های اولیه
        </Text>    
      </div>
    </section>
  );
}

export default PostNavigation;
