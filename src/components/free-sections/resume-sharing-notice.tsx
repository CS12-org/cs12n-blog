import { Text } from "~/components/react-aria-components";
import { LuRepeat1 } from "react-icons/lu";
import Button from "~/components/button";
import Repead from "~/assets/images/repeat-one.svg"
function ResumeSharingNotice() {
  return (
  <section className="bg-[#050615] gap-[10px] flex flex-col px-[10px] text-text lg:px-[30px] w-full py-[27px] text-[12px] lg:text-[14px] ">
     <section className="flex gap-[10px]">
      <div className="bg-crust  rounded-[10px] w-[40px] h-[40px] lg:h-[48px] lg:w-[48px]  flex items-center justify-center">
        <Repead className=" w-[27px] h-[27px] text-maroon" />
      </div>
      <Text
        className="w-full lg:text-[16px] 
             flex "
      >
        متوجه شدیم. در حال حاضر مایل به اشتراک گذاری هایلایت ها و یادداشت هاتون
        نیستید! اما نگران نباشید میتونید با کلیک بر روی دکمه زیر اشتراک گذاری رو
        از سر بگیرید.
      </Text>
      </section>
<section className="flex justify-end px-[10px]">
      <Button className="w-[102px]  h-[23px] bg-blue font-bold  ">
        از سرگیری
      </Button>
      </section>
    </section>
  );
}

export default ResumeSharingNotice;
