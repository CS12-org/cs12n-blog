import Close from "~/assets/images/close.svg";
import Image from "next/image";
import { Text } from "~/components/react-aria-components";
import CommentsIcon from "~/assets/images/comments.svg";
import DecreaseArrow from "~/assets/images/decreaseArrow.svg";
import Profile from "~/assets/images/farhan.jpg";
import IncreaseArrow from "~/assets/images/increaseArrow.svg";
import ThreeDotts from "~/assets/images/threeDotts.svg";
import Button from "~/components/button";
import ExcalamationMark from "~/assets/images/excalamation.svg"
import { PiArrowBendDownLeftLight } from "react-icons/pi";
import { TextInput } from "~/components/user-panel/text-field";
import Anonymous from "~/assets/images/anonymous.svg";

import Profile2 from "~/assets/images/user-profile.png";


export default function ReviewsSideBar() {
  return (
    <section className="bg-crust rounded-[10px] px-[15px] p-[10px] w-[450px] flex flex-col gap-[10px] ">
      <header className="flex justify-between items-center ">
        <h1 className="font-bold text-[18px]">نقد و بررسی</h1>
        <Close />

      </header>




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

      <section className="text-[12px] text-text bg-[#101122] w-full  rounded-b-[10px] p-[10px] gap-y-[10px] flex flex-col ">
          <section className="flex justify-between bg- items-center ">
            <Text className="font-bold">تصاویر:</Text>
            <div className="flex">
              <Image
                // TODO: اطراف این عکس ها هم باید بلری بشه حالت محو شده بگیره
                src={Profile}
                alt="farhan"
                className=" h-[38px] w-[38px] rounded-full object-cover mx-[-20px] z-0 "
              />
              <Image
                src={Profile2}
                alt="farhan"
                className=" h-[38px] w-[38px] object-cover rounded-full "
              />
            </div>


          </section>
<Text className="font-bold">متن نقد:</Text>
          <p className="">
            سلام من این هایلایت ها و نوت ها رو برای خودم نوشته بودم و گفتم شاید بدرد دیگران هم بخوره خلاصه آره گفتم اینجا بزارم شاید به بقیه هم کمک کنه


          </p>
          <section className="flex justify-between ">
            <section className="flex gap-[0px]">
              <Button className="flex rounded-l-[5px] justify-center items-center gap-[5px] bg-   p-[5px] px-[10px] text-text">
                <div className="flex flex-col justify-center gap-[5px]  ">
                  <IncreaseArrow className="w-[11px] h-[6px]" />
                  <DecreaseArrow className="w-[11px] h-[6px]  " />
                  {/* TODO: دوستان ببینید می تونید به این آیکون ها رنگ بدید یا نه */}
                </div>
                دیدن پاورقی
              </Button>
              <Button className="bg- text-text flex items-center gap-[2px]">
                <CommentsIcon />
                10
              </Button>
            </section>
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




    </section >


 

</section >
)
}
