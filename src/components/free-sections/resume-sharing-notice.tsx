import Repead from '@/assets/images/repeat-one.svg';
import Button from '@/components/button';
import { Text } from '@/components/react-aria-components';
function ResumeSharingNotice() {
  return (
    <section className="text-text flex w-full flex-col gap-[10px] bg-[#050615] px-[10px] py-[27px] text-[12px] lg:px-[30px] lg:text-[14px]">
      <section className="flex gap-[10px]">
        <div className="bg-crust flex h-[40px] w-[40px] items-center justify-center rounded-[10px] lg:h-[48px] lg:w-[48px]">
          <Repead className="text-maroon h-[27px] w-[27px]" />
        </div>
        <Text className="flex w-full lg:text-[16px]">
          متوجه شدیم. در حال حاضر مایل به اشتراک گذاری هایلایت ها و یادداشت هاتون نیستید! اما نگران نباشید میتونید با
          کلیک بر روی دکمه زیر اشتراک گذاری رو از سر بگیرید.
        </Text>
      </section>
      <section className="flex justify-end px-[10px]">
        <Button className="bg-blue h-[23px] w-[102px] font-bold">از سرگیری</Button>
      </section>
    </section>
  );
}

export default ResumeSharingNotice;
