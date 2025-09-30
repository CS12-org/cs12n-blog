import { Text } from '@/components/react-aria-components';
import Check from '@/assets/images/check.svg';
import Button from '@/components/button';

function SharingSuccessPrompt() {
  return (
    <section className="text-text flex w-full flex-col gap-[10px] bg-[#050615] px-[10px] py-[27px] text-[12px] lg:px-[30px] lg:text-[14px]">
      <section className="flex gap-[10px]">
        <span className="bg-crust flex h-[40px] w-[40px] items-center justify-center rounded-[10px] lg:h-[48px] lg:w-[48px]">
          <Check width="20px" height="20px" />
        </span>
        <Text className="col-start-2 col-end-6 flex w-full self-center lg:col-end-11 lg:text-[16px]">
          هایلایت ها و یادداشت های شما به اشتراک گذاشته شد.
        </Text>
      </section>
      <section className="flex justify-end gap-x-[10px] px-[10px]">
        <Button className="bg-maroon h-[23px] w-[102px] font-bold">لغو</Button>
        <Button className="bg-blue h-[23px] w-[102px] font-bold">ویرایش</Button>
      </section>
    </section>
  );
}

export default SharingSuccessPrompt;
