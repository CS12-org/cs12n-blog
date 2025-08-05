import { Text } from "~/components/react-aria-components";
import Check from "~/assets/images/check.svg";
import Button from "~/components/button";

function SharingSuccessPrompt() {
  return (
    <section className="bg-[#050615] px-[10px] lg:px-[30px] w-full py-[27px] text-[12px] lg:text-[14px] gap-y-[10px]  grid grid-cols-6 lg:grid-cols-12 grid-rows-3 ">
      <div className="bg-crust row-start-1 self-center row-end-3 rounded-[10px] w-[40px] h-[40px] lg:h-[48px] lg:w-[48px]  flex items-center justify-center">
        <Check className=" w-[20px] h-[20px]" />
      </div>
      <Text
        className="w-[285px] lg:w-[800px] row-start-1 row-end-3 lg:text-[16px] lg:col-start-2
             flex  lg:col-end-11  col-start-2 col-end-6 lg:mr-[10px] self-center"
      >
        هایلایت ها و یادداشت های شما به اشتراک گذاشته شد.
      </Text>
      <Button className="w-[102px] h-[23px] bg-maroon font-bold col-start-4  row-start-3 self-end justify-self-end  lg:justify-self-start lg:col-start-10">
        لغو
      </Button>
      <Button className="w-[102px] h-[23px] bg-blue  font-bold col-start-6 justify-self-end self-end row-start-3 lg:col-start-12 ">
        ویرایش
      </Button>
    </section>
  );
}

export default SharingSuccessPrompt;
