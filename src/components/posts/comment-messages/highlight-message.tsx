import { Text } from '~/components/react-aria-components';
import Image from 'next/image';
import Comments from '~/assets/images/comments.svg';
import DecreaseArrow from '~/assets/images/decreaseArrow.svg';
import Profile from '~/assets/images/farhan.jpg';
import Highlighter from '~/assets/images/highlighter.svg';
import IncreaseArrow from '~/assets/images/increaseArrow.svg';
import Notes from '~/assets/images/notes.svg';
import ThreeDotts from '~/assets/images/threeDotts.svg';
import Button from '~/components/button';

function HighlightMessege() {
  return (
    <article className="flex w-full flex-col">
      <header className="bg-crust flex justify-between rounded-l-[10px] rounded-r-[24px] p-[10px]">
        <div className="flex items-center justify-center gap-[10px]">
          <Image src={Profile} alt="farhan" className="h-[25px] w-[25px] rounded-full" />
          <Text className="text-[14px] font-bold">فرهان</Text>
        </div>
        <div className="flex items-center gap-[10px]">
          <span className="text-[12px]">2+</span>
          <Button className="bg-teal flex h-[28px] w-[28px] items-center justify-center rounded-[5px]">
            <IncreaseArrow className="h-[10px] w-[20px]" />
          </Button>
          <Button className="bg-maroon flex h-[28px] w-[28px] items-center justify-center rounded-[5px]">
            <DecreaseArrow className="h-[10px] w-[20px]" />
          </Button>
          <Button className="bg-surface-1 text-subtext-0">
            <ThreeDotts />
          </Button>
        </div>
      </header>
      <section className="flex flex-col gap-y-[15px] rounded-b-[10px] bg-[#101122] p-[10px] text-[12px] lg:mx-[40px]">
        <p>
          سلام من این هایلایت ها و نوت ها رو برای خودم نوشته بودم و گفتم شاید بدرد دیگران هم بخوره خلاصه آره گفتم اینجا
          بزارم شاید به بقیه هم کمک کنه
        </p>
        <section className="flex justify-between">
          <div className="flex gap-[5px]">
            <Button className="text-subtext-0 bg-mantle flex h-[36px] items-center justify-center gap-[7.5px] p-[10px]">
              <Highlighter className="h-[28px] w-[28px]" /> هایلایت ها
            </Button>
            <Button className="text-subtext-0 bg-mantle flex h-[36px] items-center justify-center gap-[7.5px] p-[10px]">
              <Notes className="h-[28px] w-[28px]" /> یادداشت ها
            </Button>
          </div>
          <Button className="bg- text-overlay-1 flex items-center gap-[5px]">
            12
            <Comments className="h-[29px] w-[29px]" />
          </Button>
        </section>
      </section>
    </article>
  );
}

export default HighlightMessege;
