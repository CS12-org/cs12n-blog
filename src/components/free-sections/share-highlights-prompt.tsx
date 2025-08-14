import { Text } from "~/components/react-aria-components";
import { FiShare2 } from "react-icons/fi";
import Button from "~/components/button";

function ShareHighlightsPrompt() {
  return (
    <section className="bg-[#050615] gap-[10px] flex flex-col text-text px-[10px] lg:px-[30px] w-full py-[27px] text-[12px] lg:text-[14px] ">
     <section className="flex gap-[10px]">
      <span className="bg-crust  rounded-[10px] w-[40px] h-[40px] lg:h-[48px] lg:w-[48px]  flex items-center justify-center">
        <FiShare2 className=" w-[20px] h-[20px] text-text" />
      </span>
      <Text
        className="w-full lg:text-[16px] 
             flex " 
      >
        شما بخش هایی از این مطلب رو هایلایت کردید، و یادداشت گذاشتید. آیا مایلید
        که این یادداشت و هایلایت ها رو با دیگر کاربران به اشتراک بگذارید؟
      </Text>
      </section>
      <section className="flex justify-end gap-x-[10px] px-[10px]">
      <Button className="w-[102px] h-[23px] bg-teal font-bold  ">
        بله
      </Button>
      <Button className="w-[102px] h-[23px] bg-maroon  font-bold ">
        خیر
      </Button>
      </section>
    </section>
  );
}

export default ShareHighlightsPrompt;
