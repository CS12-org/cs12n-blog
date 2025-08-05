import { Text } from "~/components/react-aria-components";
import { FiShare2 } from "react-icons/fi";
import Button from "~/components/button";

function ShareHighlightsPrompt() {
  return (
    <section className="bg-[#050615] px-[10px] lg:px-[30px] w-full py-[27px] text-[12px] lg:text-[14px] gap-y-[10px]  grid grid-cols-6 lg:grid-cols-12 grid-rows-3 ">
      <div className="bg-crust row-start-1 row-end-3 rounded-[10px] w-[40px] h-[40px] lg:h-[48px] lg:w-[48px]  flex items-center justify-center">
        <FiShare2 className=" w-[20px] h-[20px]" />
      </div>
      <Text
        className="w-[285px] lg:w-[800px] row-start-1 row-end-3 lg:text-[16px] lg:col-start-2
             flex  lg:col-end-11  col-start-2 col-end-6 lg:mr-[10px]"
      >
        شما بخش هایی از این مطلب رو هایلایت کردید، و یادداشت گذاشتید. آیا مایلید
        که این یادداشت و هایلایت ها رو با دیگر کاربران به اشتراک بگذارید؟
      </Text>
      <Button className="w-[102px] h-[23px] bg-teal font-bold col-start-4  row-start-3 self-end justify-self-end  lg:justify-self-start lg:col-start-10">
        بله
      </Button>
      <Button className="w-[102px] h-[23px] bg-maroon  font-bold col-start-6 justify-self-end self-end row-start-3 lg:col-start-12 ">
        خیر
      </Button>
    </section>
  );
}

export default ShareHighlightsPrompt;
