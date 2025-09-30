import { Text } from '@/components/react-aria-components';
import Shareit from '@/assets/images/shareit.svg';
import Button from '@/components/button';

function ShareHighlightsPrompt() {
  return (
    <section className="text-text flex w-full flex-col gap-[10px] bg-[#050615] px-[10px] py-[27px] text-[12px] lg:px-[30px] lg:text-[14px]">
      <section className="flex gap-[10px]">
        <span className="bg-crust flex h-[40px] w-[40px] items-center justify-center rounded-[10px] lg:h-[48px] lg:w-[48px]">
          <Shareit className="text-text h-[27px] w-[27px]" />
        </span>
        <Text className="flex w-full lg:text-[16px]">
          شما بخش هایی از این مطلب رو هایلایت کردید، و یادداشت گذاشتید. آیا مایلید که این یادداشت و هایلایت ها رو با
          دیگر کاربران به اشتراک بگذارید؟
        </Text>
      </section>
      <section className="flex justify-end gap-x-[10px] px-[10px]">
        <Button className="bg-teal h-[23px] w-[102px] font-bold">بله</Button>
        <Button className="bg-maroon h-[23px] w-[102px] font-bold">خیر</Button>
      </section>
    </section>
  );
}

export default ShareHighlightsPrompt;
