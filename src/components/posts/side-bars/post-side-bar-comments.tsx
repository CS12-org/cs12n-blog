import Image from "next/image";
import { PiArrowBendDownLeftLight } from "react-icons/pi";
import Anonymous from "~/assets/images/anonymous.svg";
import Close from "~/assets/images/close.svg";
import CommentsIcon from "~/assets/images/comments.svg";
import DecreaseArrow from "~/assets/images/decreaseArrow.svg";
import Profile from "~/assets/images/farhan.jpg";
import IncreaseArrow from "~/assets/images/increaseArrow.svg";
import ThreeDotts from "~/assets/images/threeDotts.svg";
import Button from "~/components/button";
import { Text } from "~/components/react-aria-components";
import { TextInput } from "~/components/user-panel/text-field";
export default function CommentsSideBar() {
  return (
    <section className="bg-crust rounded-[10px] px-[15px] p-[10px] w-[450px] flex flex-col gap-[10px] ">
      <header className="flex justify-between items-center ">
        <h1 className="font-bold text-[18px]">نظرات</h1>
        <Close />
      </header>
      <section className="text-[14px] gap-[5px] bg-[#101122] grid grid-rows-3 grid-cols-14   rounded-[12px] pb-[30px]  px-[10px] ">
        <span className="flex gap-[10px] self-end items-center pb-[5px] row-start-1 row-end-1 col-start-1  col-end-6">
          <Anonymous />
          <span className="font-bold text-subtext-0">نام فرد</span>
        </span>
        <div className="row-start-2 row-end-2 col-start-1 col-end-15">
          <TextInput
            className="lg:!p-[15px]  h-[35px] p-[5px] w-full text-[12px] lg:text-[14px] placeholder:text-text text-text"
            name="نقد و نکات"
            placeholder="کامنت خود رو بنویسید ..."
          />
        </div>

        <Button className="bg-blue w-full row-start-3 row-end-3 col-start-1 mt-[5px] col-end-15  h-[35px] font-bold rounded-[10px] text-crust">
          ارسال نظر
        </Button>
      </section>

      <section className="p-[5px] bg-surface-1 rounded-[5px] flex flex-col gap-[10px]">
        <article className=" w-full flex flex-col w-full ">
          <header className="flex justify-between rounded-tr-[10px] rounded-tl-[10px] px-[10px] py-[15px]  bg-base">
            <div className="flex justify-center gap-[10px] items-center">
              <Image
                src={Profile}
                alt="farhan"
                className="rounded-full h-[25px] w-[25px]"
              />
              <Text className="text-[14px] text-subtext-0">فرهان</Text>
            </div>
            <div className="w-[23px] h-[23px] bg-base rounded-[3px] flex justify-center">
              <Button className="bg-  text-subtext-0">
                <ThreeDotts width="18px" height="4px" />
              </Button>
            </div>
          </header>

          <section className="text-[12px] text-text bg-[#101122] w-full  rounded-b-[10px] p-[10px] gap-y-[15px] flex flex-col ">
            <p>
              سلام من این هایلایت ها و نوت ها رو برای خودم نوشته بودم و گفتم
              شاید بدرد دیگران هم بخوره خلاصه آره گفتم اینجا بزارم شاید به بقیه
              هم کمک کنه
            </p>
            <section className="flex justify-between">
              <Button className="bg- text-text flex items-center gap-[5px]">
                <CommentsIcon />
                پاسخ ها
              </Button>
              <div className="flex items-center gap-[3px] items-center ">
                <span className="text-[12px]">2+</span>
                <Button className="bg- w-[20px] h-[20px]  text-teal rounded-[5px] flex justify-center items-center">
                  <IncreaseArrow width="16px" height="8px" />
                </Button>
                <Button className="bg- text-maroon  flex justify-center items-center w-[20px] h-[20px] rounded-[5px]">
                  <DecreaseArrow width="16px" height="8px" />
                </Button>
              </div>
            </section>
          </section>
        </article>

        <article className=" w-full flex flex-col w-full ">
          <header className="flex justify-between rounded-tr-[10px] rounded-tl-[10px] px-[10px] py-[15px]  bg-base">
            <div className="flex justify-center gap-[10px] items-center">
              <Image
                src={Profile}
                alt="farhan"
                className="rounded-full h-[25px] w-[25px]"
              />
              <Text className="text-[14px] text-subtext-0">فرهان</Text>
            </div>
            <div className="w-[23px] h-[23px] bg-base rounded-[3px] flex justify-center">
              <Button className="bg-  text-subtext-0">
                <ThreeDotts width="18px" height="4px" />
              </Button>
            </div>
          </header>
          <section className="text-[12px] text-text bg-[#101122] w-full  rounded-b-[10px] py-[10px] gap-y-[15px] flex flex-col ">
            <section className="bg-mantle  border-r-[4px]  border-sapphire w-full h-auto flex justify-between text-text py-[13px] px-[10px]  ">
              <PiArrowBendDownLeftLight className="text-subtext-0 text-[20px]" />
              <p className=" ">بخشی از متن که هایلایت شده آمده است اینجا</p>
            </section>

            <p className="px-[10px]">
              سلام من این هایلایت ها و نوت ها رو برای خودم نوشته بودم و گفتم
              شاید بدرد دیگران هم بخوره خلاصه آره گفتم اینجا بزارم شاید به بقیه
              هم کمک کنه
            </p>
            <section className="flex justify-between px-[10px]">
              <Button className="bg- text-text flex items-center gap-[5px]">
                <CommentsIcon />
                پاسخ ها
              </Button>
              <div className="flex items-center gap-[3px] items-center ">
                <span className="text-[12px]">2+</span>
                <Button className="bg- w-[20px] h-[20px]  text-teal rounded-[5px] flex justify-center items-center">
                  <IncreaseArrow width="16px" height="8px" />
                </Button>
                <Button className="bg- text-maroon  flex justify-center items-center w-[20px] h-[20px] rounded-[5px]">
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
