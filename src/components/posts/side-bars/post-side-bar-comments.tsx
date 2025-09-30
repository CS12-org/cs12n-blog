import Image from 'next/image';
import { PiArrowBendDownLeftLight } from 'react-icons/pi';
import Anonymous from '@/assets/images/anonymous.svg';
import Close from '@/assets/images/close.svg';
import CommentsIcon from '@/assets/images/comments.svg';
import DecreaseArrow from '@/assets/images/decreaseArrow.svg';
import IncreaseArrow from '@/assets/images/increaseArrow.svg';
import ThreeDotts from '@/assets/images/threeDotts.svg';
import Button from '@/components/button';
import { Text } from '@/components/react-aria-components';
import { TextInput } from '@/components/user-panel/text-field';
export default function CommentsSideBar() {
  return (
    <section className="bg-crust flex w-[450px] flex-col gap-[10px] rounded-[10px] p-[10px] px-[15px]">
      <header className="flex items-center justify-between">
        <h1 className="text-[18px] font-bold">نظرات</h1>
        <Close />
      </header>
      <section className="grid grid-cols-14 grid-rows-3 gap-[5px] rounded-[12px] bg-[#101122] px-[10px] pb-[30px] text-[14px]">
        <span className="col-start-1 col-end-6 row-start-1 row-end-1 flex items-center gap-[10px] self-end pb-[5px]">
          <Anonymous />
          <span className="text-subtext-0 font-bold">نام فرد</span>
        </span>
        <div className="col-start-1 col-end-15 row-start-2 row-end-2">
          <TextInput
            className="placeholder:text-text text-text h-[35px] w-full p-[5px] text-[12px] lg:!p-[15px] lg:text-[14px]"
            name="نقد و نکات"
            placeholder="کامنت خود رو بنویسید ..."
          />
        </div>

        <Button className="bg-blue text-crust col-start-1 col-end-15 row-start-3 row-end-3 mt-[5px] h-[35px] w-full rounded-[10px] font-bold">
          ارسال نظر
        </Button>
      </section>

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

          <section className="text-text flex w-full flex-col gap-y-[15px] rounded-b-[10px] bg-[#101122] p-[10px] text-[12px]">
            <p>
              سلام من این هایلایت ها و نوت ها رو برای خودم نوشته بودم و گفتم شاید بدرد دیگران هم بخوره خلاصه آره گفتم
              اینجا بزارم شاید به بقیه هم کمک کنه
            </p>
            <section className="flex justify-between">
              <Button className="bg- text-text flex items-center gap-[5px]">
                <CommentsIcon />
                پاسخ ها
              </Button>
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
          <section className="text-text flex w-full flex-col gap-y-[15px] rounded-b-[10px] bg-[#101122] py-[10px] text-[12px]">
            <section className="bg-mantle border-sapphire text-text flex h-auto w-full justify-between border-r-[4px] px-[10px] py-[13px]">
              <PiArrowBendDownLeftLight className="text-subtext-0 text-[20px]" />
              <p className=" ">بخشی از متن که هایلایت شده آمده است اینجا</p>
            </section>

            <p className="px-[10px]">
              سلام من این هایلایت ها و نوت ها رو برای خودم نوشته بودم و گفتم شاید بدرد دیگران هم بخوره خلاصه آره گفتم
              اینجا بزارم شاید به بقیه هم کمک کنه
            </p>
            <section className="flex justify-between px-[10px]">
              <Button className="bg- text-text flex items-center gap-[5px]">
                <CommentsIcon />
                پاسخ ها
              </Button>
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
