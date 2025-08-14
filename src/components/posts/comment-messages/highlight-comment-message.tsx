import Image from "next/image";
import { Text } from "~/components/react-aria-components";
import CommentsIcon from "~/assets/images/comments.svg";
import DecreaseArrow from "~/assets/images/decreaseArrow.svg";
import Profile from "~/assets/images/farhan.jpg";
import Highlighter from "~/assets/images/highlighter.svg";
import IncreaseArrow from "~/assets/images/increaseArrow.svg";
import ThreeDotts from "~/assets/images/threeDotts.svg";
import Button from "~/components/button";

function HighlightCommentMessege() {
  return (
    <article className=" w-full flex flex-col px-[20px] ">
      <header className="flex justify-between  rounded-tr-full rounded-br-full rounded-tl-[10px] p-[10px]  bg-crust">
        <div className="flex justify-center gap-[10px] items-center">
          <Image
            src={Profile}
            alt="farhan"
            className="rounded-full h-[25px] w-[25px]"
          />
          <Text className="text-[14px] text-subtext-0 font-bold">فرهان</Text>
        </div>
        <div className="flex items-center gap-[10px]">
          <span className="text-[12px]">2+</span>
          <Button className="bg-teal w-[28px] h-[28px] rounded-[5px] flex justify-center items-center">
            <IncreaseArrow   className="w-[20px] h-[10px]"/>
          </Button>
          <Button className="bg-maroon flex justify-center items-center w-[28px] h-[28px] rounded-[5px]">
            <DecreaseArrow   className="w-[20px] h-[10px]"/>
          </Button>
          <Button className="bg-  text-subtext-0">
            <ThreeDotts />
          </Button>
        </div>
      </header>

      <section className="text-[12px] text-text bg-[#101122] mx-[20px] rounded-b-[10px] py-[10px] gap-y-[15px] flex flex-col ">
        <section className="bg-mantle pl-[10px]  w-full h-auto flex justify-between text-text py-[13px] text-[14px]  ">
        <section className="flex itmens-center">
<span aria-hidden className="w-[5px] shrink-0 bg-sapphire " ></span>
<p className="  grow px-2.5 truncate">بخشی از متن که هایلایت شده آمده است اینجا</p>
</section>
          <Highlighter className="" />
        </section>
        <p className="px-[10px]">
          سلام من این هایلایت ها و نوت ها رو برای خودم نوشته بودم و گفتم شاید
          بدرد دیگران هم بخوره خلاصه آره گفتم اینجا بزارم شاید به بقیه هم کمک
          کنه
        </p>
        <section className="flex justify-between px-[10px]">
          <Button className="bg- text-text flex items-center gap-[5px]">
            <CommentsIcon  className="w-[29px] h-[29px]" />
            پاسخ ها
          </Button>
        </section>
      </section>
    </article>
  );
}

export default HighlightCommentMessege;
