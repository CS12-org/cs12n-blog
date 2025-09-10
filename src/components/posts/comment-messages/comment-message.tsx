import Image from 'next/image';
import { Text } from '~/components/react-aria-components';
import CommentsIcon from '~/assets/images/comments.svg';
import DecreaseArrow from '~/assets/images/decreaseArrow.svg';
import Profile from '~/assets/images/farhan.jpg';
import IncreaseArrow from '~/assets/images/increaseArrow.svg';
import ThreeDotts from '~/assets/images/threeDotts.svg';
import Button from '~/components/button';

function CommentMessege() {
  return (
    <article className="flex w-full flex-col px-[20px]">
      <header className="bg-crust flex justify-between rounded-tl-[10px] rounded-tr-[10px] p-[10px] lg:rounded-tr-full lg:rounded-br-full">
        <div className="flex items-center justify-center gap-[10px]">
          <Image src={Profile} alt="farhan" className="h-[25px] w-[25px] rounded-full" />
          <Text className="text-subtext-0 text-[14px] font-bold">فرهان</Text>
        </div>
        <div className="flex items-center gap-[10px]">
          <span className="text-[12px]">2+</span>
          <Button className="bg-teal flex h-[28px] w-[28px] items-center justify-center rounded-[5px]">
            <IncreaseArrow className="h-[10px] w-[20px]" />
          </Button>
          <Button className="bg-maroon flex h-[28px] w-[28px] items-center justify-center rounded-[5px]">
            <DecreaseArrow className="h-[10px] w-[20px]" />
          </Button>
          <Button className="bg- text-subtext-0">
            <ThreeDotts />
          </Button>
        </div>
      </header>
      <section className="text-text flex flex-col gap-y-[15px] rounded-b-[10px] bg-[#101122] p-[10px] text-[12px] lg:mx-[20px]">
        <p>
          سلام من این هایلایت ها و نوت ها رو برای خودم نوشته بودم و گفتم شاید بدرد دیگران هم بخوره خلاصه آره گفتم اینجا
          بزارم شاید به بقیه هم کمک کنه
        </p>
        <section className="flex justify-between">
          <Button className="bg- text-text flex items-center gap-[5px]">
            <CommentsIcon className="h-[29px] w-[29px]" />
            پاسخ ها
          </Button>
        </section>
      </section>
    </article>
  );
}

export default CommentMessege;
