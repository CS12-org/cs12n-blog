import { Text } from "~/components/react-aria-components";
import Image from "next/image";
import Comments from "~/assets/images/comments.svg";
import DecreaseArrow from "~/assets/images/decreaseArrow.svg";
import Profile from "~/assets/images/farhan.jpg";
import Highlighter from "~/assets/images/highlighter.svg";
import IncreaseArrow from "~/assets/images/increaseArrow.svg";
import Notes from "~/assets/images/notes.svg";
import ThreeDotts from "~/assets/images/threeDotts.svg";
import Button from "~/components/button";

function HighlightMessege() {
  return (
    <article className="w-full flex flex-col">
      <header className="flex justify-between rounded-l-[10px] rounded-r-[24px] p-[10px] bg-crust">
        <div className="flex justify-center gap-[10px] items-center">
          <Image
            src={Profile}
            alt="farhan"
            className="rounded-full h-[25px] w-[25px]"
          />
          <Text className="text-[14px] font-bold">فرهان</Text>
        </div>
        <div className="flex items-center gap-[10px]">
          <span className="text-[12px]">2+</span>
          <Button className="bg-teal w-[28px] h-[28px] rounded-[5px] flex justify-center items-center">
            <IncreaseArrow className="w-[20px] h-[10px]" />
          </Button>
          <Button className="bg-maroon flex justify-center items-center w-[28px] h-[28px] rounded-[5px]">
            <DecreaseArrow className="w-[20px] h-[10px]" />
          </Button>
          <Button className="bg-surface-1 text-subtext-0">
            <ThreeDotts />
          </Button>
        </div>
      </header>
      <section className="text-[12px] bg-[#101122] lg:mx-[40px] rounded-b-[10px] p-[10px] gap-y-[15px] flex flex-col ">
        <p>
          سلام من این هایلایت ها و نوت ها رو برای خودم نوشته بودم و گفتم شاید
          بدرد دیگران هم بخوره خلاصه آره گفتم اینجا بزارم شاید به بقیه هم کمک
          کنه
        </p>
        <section className="flex justify-between">
          <div className="flex gap-[5px]">
            <Button className="p-[10px] justify-center items-center text-subtext-0  bg-mantle h-[36px] flex gap-[7.5px]">
              <Highlighter className="h-[28px] w-[28px]" /> هایلایت ها
            </Button>
            <Button className="p-[10px] justify-center items-center text-subtext-0  bg-mantle h-[36px] flex gap-[7.5px]">
              <Notes className="h-[28px] w-[28px]" /> یادداشت ها
            </Button>
          </div>
          <Button className="bg- text-overlay-1 flex items-center gap-[5px]">
            12
            <Comments className="w-[29px] h-[29px]" />
          </Button>
        </section>
      </section>
    </article>
  );
}

export default HighlightMessege;
