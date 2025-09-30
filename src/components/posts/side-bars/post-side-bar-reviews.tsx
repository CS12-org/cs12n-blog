import Image from 'next/image';
import Close from '@/assets/images/close.svg';
import CommentsIcon from '@/assets/images/comments.svg';
import DecreaseArrow from '@/assets/images/decreaseArrow.svg';
import IncreaseArrow from '@/assets/images/increaseArrow.svg';
import ThreeDotts from '@/assets/images/threeDotts.svg';
import Button from '@/components/button';
import { Text } from '@/components/react-aria-components';

export default function ReviewsSideBar() {
  return (
    <section className="bg-crust flex w-[450px] flex-col gap-[10px] rounded-[10px] p-[10px] px-[15px]">
      <header className="flex items-center justify-between">
        <h1 className="text-[18px] font-bold">نقد و بررسی</h1>
        <Close />
      </header>

      <section className="bg-surface-1 flex flex-col gap-[10px] rounded-[5px] p-[5px]">
        <article className="flex w-full flex-col">
          <header className="bg-base flex justify-between rounded-tl-[10px] rounded-tr-[10px] px-[10px] py-[15px]">
            <div className="flex items-center justify-center gap-[10px]">
              <Image src="/farhan.jpg" alt="farhan" width={25} height={25} className="h-[25px] w-[25px] rounded-full" />
              <Text className="text-subtext-0 text-[14px]">فرهان</Text>
            </div>
            <div className="bg-base flex h-[23px] w-[23px] justify-center rounded-[3px]">
              <Button className="bg- text-subtext-0">
                <ThreeDotts width="18px" height="4px" />
              </Button>
            </div>
          </header>

          <section className="text-text flex w-full flex-col gap-y-[10px] rounded-b-[10px] bg-[#101122] p-[10px] text-[12px]">
            <section className="bg- flex items-center justify-between">
              <Text className="font-bold">تصاویر:</Text>
              <div className="flex">
                <Image
                  // TODO: اطراف این عکس ها هم باید بلری بشه حالت محو شده بگیره
                  src="/farhan.jpg"
                  alt="farhan"
                  className="z-0 mx-[-20px] h-[38px] w-[38px] rounded-full object-cover"
                />
                <Image
                  src="/user-profile.png"
                  alt="farhan"
                  width={38}
                  height={38}
                  className="h-[38px] w-[38px] rounded-full object-cover"
                />
              </div>
            </section>
            <Text className="font-bold">متن نقد:</Text>
            <p className="">
              سلام من این هایلایت ها و نوت ها رو برای خودم نوشته بودم و گفتم شاید بدرد دیگران هم بخوره خلاصه آره گفتم
              اینجا بزارم شاید به بقیه هم کمک کنه
            </p>
            <section className="flex justify-between">
              <section className="flex gap-[0px]">
                <Button className="bg- text-text flex items-center justify-center gap-[5px] rounded-l-[5px] p-[5px] px-[10px]">
                  <div className="flex flex-col justify-center gap-[5px]">
                    <IncreaseArrow className="h-[6px] w-[11px]" />
                    <DecreaseArrow className="h-[6px] w-[11px]" />
                    {/* TODO: دوستان ببینید می تونید به این آیکون ها رنگ بدید یا نه */}
                  </div>
                  دیدن پاورقی
                </Button>
                <Button className="bg- text-text flex items-center gap-[2px]">
                  <CommentsIcon />
                  10
                </Button>
              </section>
              <div className="flex items-center gap-[3px]">
                <span className="text-[12px]">2+</span>
                <Button className="bg- text-teal flex h-[20px] w-[20px] items-center justify-center rounded-[5px]">
                  <IncreaseArrow width="16px" height="8px" />
                </Button>
                <Button className="bg- text-maroon flex h-[20px] w-[20px] items-center justify-center rounded-[5px]">
                  <DecreaseArrow width="16px" height="8px" />
                </Button>
              </div>
            </section>
          </section>
        </article>
      </section>
    </section>
  );
}
