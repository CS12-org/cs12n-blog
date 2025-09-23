import Image from 'next/image';
import { Text } from '~/components/react-aria-components';
import CommentsIcon from '~/assets/images/comments.svg';
import DecreaseArrow from '~/assets/images/decreaseArrow.svg';
import Close from '~/assets/images/close.svg';
import { TextInput } from '~/components/user-panel/text-field';

import IncreaseArrow from '~/assets/images/increaseArrow.svg';
import ThreeDotts from '~/assets/images/threeDotts.svg';
import Button from '~/components/button';

export default function CommentsTabUserPanel() {
  return (
    <section className="flex flex-col gap-[10px]">
      <span className="bg-mantle flex w-full items-center justify-between rounded-[10px] p-[10px]">
        <p className="text-subtext-0 text-[12px]">
          در اینجا شما نظرات رو خواهید دید میتوانید برای پاسخ دادن از markdown برای استایل دادن به نظراتتون استفاده
          کنید.
        </p>
        <Close className="bg-crust" />
      </span>

      <article className="flex w-full flex-col px-[20px]">
        <header className="bg-crust flex justify-between rounded-tl-[10px] rounded-tr-[10px] p-[10px]">
          <div className="flex items-center justify-center gap-[10px]">
            <Image src="/farhan.jpg" alt="farhan" width={25} height={25} className="h-[25px] w-[25px] rounded-full" />
            <Text className="text-subtext-0 text-[14px] font-bold">فرهان</Text>
          </div>
          <div className="flex items-center gap-[10px]">
            <span className="text-[12px]">2+</span>
            <Button className="bg-teal flex h-[28px] w-[28px] items-center justify-center rounded-[5px]">
              <IncreaseArrow />
            </Button>
            <Button className="bg-maroon flex h-[28px] w-[28px] items-center justify-center rounded-[5px]">
              <DecreaseArrow />
            </Button>
            <Button className="bg- text-subtext-0">
              <ThreeDotts />
            </Button>
          </div>
        </header>

        <section className="text-text flex flex-col gap-y-[15px] rounded-b-[10px] bg-[#101122] py-[10px] text-[12px]">
          <section className="bg-surface-0 text-text flex h-auto w-full justify-between px-[10px] py-[13px] text-[14px]">
            <p className=" ">در پاسخ به : من به نظرم فلان هست </p>
          </section>
          <p className="px-[10px]">
            سلام من این هایلایت ها و نوت ها رو برای خودم نوشته بودم و گفتم شاید بدرد دیگران هم بخوره خلاصه آره گفتم
            اینجا بزارم شاید به بقیه هم کمک کنه
          </p>
          <section className="flex justify-between px-[10px]">
            <Button className="bg- text-text flex items-center gap-[5px]">
              <CommentsIcon />
              پاسخ دهید
            </Button>
          </section>
        </section>
      </article>

      <article className="flex w-full flex-col px-[20px]">
        <header className="bg-crust flex justify-between rounded-tl-[10px] rounded-tr-[10px] p-[10px]">
          <div className="flex items-center justify-center gap-[10px]">
            <Image src="/farhan.jpg" alt="farhan" width={25} height={25} className="h-[25px] w-[25px] rounded-full" />
            <Text className="text-subtext-0 text-[14px] font-bold">فرهان</Text>
          </div>
          <div className="flex items-center gap-[10px]">
            <span className="text-[12px]">2+</span>
            <Button className="bg-teal flex h-[28px] w-[28px] items-center justify-center rounded-[5px]">
              <IncreaseArrow />
            </Button>
            <Button className="bg-maroon flex h-[28px] w-[28px] items-center justify-center rounded-[5px]">
              <DecreaseArrow />
            </Button>
            <Button className="bg- text-subtext-0">
              <ThreeDotts />
            </Button>
          </div>
        </header>

        <section className="text-text flex flex-col gap-y-[10px] rounded-b-[10px] bg-[#101122] py-[10px] text-[12px]">
          <section className="bg-surface-0 text-text flex h-auto w-full justify-between px-[10px] py-[13px] text-[14px]">
            <p className=" ">در پاسخ به : من به نظرم فلان هست </p>
          </section>
          <p className="px-[10px]">
            سلام من این هایلایت ها و نوت ها رو برای خودم نوشته بودم و گفتم شاید بدرد دیگران هم بخوره خلاصه آره گفتم
            اینجا بزارم شاید به بقیه هم کمک کنه
          </p>
          <section className="flex gap-[8px] px-[10px]">
            <Button className="bg- text-text flex items-center gap-[5px]">
              <CommentsIcon />
              پاسخ دهید
            </Button>
            <Button className="bg- text-text flex items-center gap-[5px]">
              <Close className="bg- h-[13px] w-[13px]" />
              لغو پاسخ
            </Button>
          </section>
          <div className="flex flex-col gap-[10px] px-[10px] text-[14px]">
            <TextInput className="text-text h-[52px] text-[14px]" placeholder="کامنت خود را بنویسید ..." />
            <Button className="bg-blue text-crust h-[52px] w-full font-bold">ارسال نظر</Button>
          </div>
        </section>
      </article>
    </section>
  );
}
