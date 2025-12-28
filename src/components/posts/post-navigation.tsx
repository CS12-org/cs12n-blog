'use client';
import { Text } from '@/components/react-aria-components';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import Button from '@/components/button';
import { useUserStore } from '@/store/user-store';

function PostNavigation() {
  const userProfile = useUserStore((state) => state.userProfile);
  console.log(userProfile);
  return (
    <section className="text-text divide-surface-2 flex w-full divide-x-2 divide-dashed">
      <div className="bg-crust grid w-full grid-cols-7 grid-rows-2 justify-start gap-y-[10px] rounded-r-[10px] py-[10px] pr-[10px] lg:py-[20px] lg:pr-[50px]">
        <Button className="bg-mauve col-start-1 col-end-1 row-start-1 row-end-1 flex h-[40px] w-[40px] items-center justify-center self-center rounded-full">
          <FaArrowRightLong className="text-[25px] text-[#351955]" />
        </Button>
        <Text className="col-start-3 row-start-1 row-end-1 self-center justify-self-start text-[16px] font-extrabold lg:col-start-2 lg:col-end-3 lg:text-[20px]">
          بعدی
        </Text>
        <Text className="bg-mantle border-sapphire col-start-1 col-end-7 row-start-2 row-end-2 h-auto self-center truncate rounded-[5px] border-r-[3px] p-[5px] text-[12px] lg:py-[5px] lg:text-[16px]">
          قسمت سوم : بش اسکریپت درک فایل سیستم
        </Text>
      </div>
      <div className="bg-crust grid w-full grid-cols-7 grid-rows-2 justify-end gap-y-[10px] rounded-l-[10px] py-[10px] pl-[10px] lg:py-[20px] lg:pl-[50px]">
        <Button className="bg-mauve col-start-6 col-end-8 row-start-1 row-end-1 flex h-[40px] w-[40px] items-center justify-center self-center justify-self-end rounded-full lg:col-start-7">
          <FaArrowLeftLong className="text-[25px] text-[#351955]" />
        </Button>
        <Text className="col-start-4 col-end-6 row-start-1 row-end-1 self-center justify-self-end text-[16px] font-extrabold lg:col-start-6 lg:col-end-7 lg:text-[20px]">
          قبلی
        </Text>
        <Text className="bg-mantle border-sapphire col-start-2 col-end-8 row-start-2 row-end-2 h-auto self-center truncate rounded-[5px] border-l-[3px] p-[5px] text-[12px] lg:py-[5px] lg:text-[16px]">
          قسمت اول : بش اسکریپت کامند های اولیه
        </Text>
      </div>
    </section>
  );
}

export default PostNavigation;
