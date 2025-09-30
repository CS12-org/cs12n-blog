import { Button, Text } from '@/components/react-aria-components';
import Image from 'next/image';
import Comments from '@/assets/images/comments.svg';
import DecreaseArrow from '@/assets/images/decreaseArrow.svg';
import IncreaseArrow from '@/assets/images/increaseArrow.svg';
import ThreeDotts from '@/assets/images/threeDotts.svg';

function ReviewMessege() {
  return (
    <article className="flex w-full flex-col">
      <header className="bg-crust flex justify-between rounded-tl-[10px] rounded-tr-[10px] p-[10px] lg:rounded-tl-[10px] lg:rounded-tr-full lg:rounded-br-full">
        {/* TODO: اینجا باید سمت چپ بالای هدر گردی بگیره اما خب نمیگیره */}
        <div className="flex items-center justify-center gap-[10px]">
          <Image src="/farhan.jpg" alt="farhan" width={25} height={25} className="h-[25px] w-[25px] rounded-full" />
          <Text className="text-subtext-0 text-[14px] font-bold">فرهان</Text>
          <Text className="text-sapphire bg-base rounded-[6px] px-[20px] text-[14px] font-bold">منتور</Text>
        </div>
        <section className="flex items-center gap-[10px]">
          <span className="text-[12px]">2+</span>
          <Button className="bg-teal flex h-[28px] w-[28px] items-center justify-center rounded-[5px]">
            <IncreaseArrow className="text-crust h-[10px] w-[20px]" />
          </Button>
          <Button className="bg-maroon flex h-[28px] w-[28px] items-center justify-center rounded-[5px]">
            <DecreaseArrow className="text-crust h-[10px] w-[20px]" />
          </Button>
          <Button className="bg- text-subtext-0">
            <ThreeDotts />
          </Button>
        </section>
      </header>

      <section className="flex flex-col gap-y-[15px] rounded-b-[10px] bg-[#101122] text-[12px] lg:mx-[40px]">
        <p className="p-[10px]">
          مقاله‌ای که به بررسی موضوع بش‌ (۰) پرداخته، به خوبی ابعاد مختلف این مفهوم را تحلیل کرده است. با این حال، برخی
          از نکات کلیدی نادیده گرفته شده‌اند که می‌توانستند به عمق بیشتری در بحث کمک کنند. به‌طور کلی، مقاله می‌تواند با
          ارائه مثال‌های عملی و مستندات بیشتر، جذاب‌تر و آموزنده‌تر شود. نقد مقاله در مورد بش
        </p>
        <section className="border-base flex items-center justify-between border-t-[1px] border-b-[1px] px-[10px] py-[11.5px] text-[12px]">
          <div className="flex">
            <Button className="bg-mantle text-subtext-0 border-surface-1 text-text flex items-center justify-center gap-[6px] rounded-r-[5px] border-l-[1px] p-[5px] px-[10px]">
              <Comments className="h-[29px] w-[29px]" />
              پاسخ ها
            </Button>
            <Button className="bg-mantle text-subtext-0 text-text flex items-center justify-center gap-[7px] rounded-l-[5px] p-[5px] px-[10px]">
              <div className="text-subtext-0 flex flex-col justify-center gap-[5px]">
                <IncreaseArrow className="h-[10px] w-[14px]" />
                <DecreaseArrow className="h-[10px] w-[14px]" />
                {/* TODO: دوستان ببینید می تونید به این آیکون ها رنگ بدید یا نه */}
              </div>
              دیدن پاورقی
            </Button>
          </div>

          <section className="flex -space-x-7">
            <div className="relative z-30 h-[38px] w-[38px] overflow-hidden rounded-full bg-[#101122]">
              <Image
                src="/user-profile.png"
                alt="farhan"
                width={38}
                height={38}
                className="h-full w-full object-cover"
              />

              <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_8px_#101122]"></div>
            </div>

            <div className="relative z-10 h-[38px] w-[38px] overflow-hidden rounded-full bg-[#101122]">
              <Image src="/farhan.jpg" alt="farhan" width={38} height={38} className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_3px_1px_#101122]"></div>
            </div>
          </section>
        </section>
        <ul className="px-[10px] pb-[20px] text-[10px]">
          <li>
            <span className="text-sapphire">0 : </span> بش یک زبان شل اسکریپتی در سیستم های یونیکس بیس هست که نمیدونم
            برای ارتباط با سیستم عامل و اینجور چیزا ساخته شده
          </li>
        </ul>
      </section>
    </article>
  );
}

export default ReviewMessege;
