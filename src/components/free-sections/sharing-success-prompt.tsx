import { Text } from "~/components/react-aria-components";
import Check from "~/assets/images/check.svg";
import Button from "~/components/button";

function SharingSuccessPrompt() {
  return (
    <section className="bg-[#050615] flex flex-col text-text px-[10px] lg:px-[30px] w-full py-[27px] text-[12px] lg:text-[14px]   ">
    <section className="flex gap-[10px]">
      <span className="bg-crust  rounded-[10px] w-[40px] h-[40px] lg:h-[48px] lg:w-[48px]  flex items-center justify-center">
        <Check width="20px" height="20px" />
      </span>
      <Text
        className="w-full lg:text-[16px]
             flex  lg:col-end-11  col-start-2 col-end-6 lg:mr-[10px] self-center"
      >
        هایلایت ها و یادداشت های شما به اشتراک گذاشته شد.
      </Text>
      </section>
      <section className="flex justify-end gap-x-[10px]">
      <Button className="w-[102px] h-[23px] bg-maroon font-bold ">
        لغو
      </Button>
      <Button className="w-[102px] h-[23px] bg-blue  font-bold ">
        ویرایش
      </Button>
      </section>
    </section>
  );
}

export default SharingSuccessPrompt;
