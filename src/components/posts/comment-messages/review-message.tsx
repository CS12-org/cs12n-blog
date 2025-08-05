import { Button, Text } from "~/components/react-aria-components";
import Image from "next/image";
import Comments from "~/assets/images/comments.svg";
import DecreaseArrow from "~/assets/images/decreaseArrow.svg";
import Profile from "~/assets/images/farhan.jpg";
import IncreaseArrow from "~/assets/images/increaseArrow.svg";
import ThreeDotts from "~/assets/images/threeDotts.svg";
import Profile2 from "~/assets/images/user-profile.png";

function ReviewMessege() {
  return (
    <article className=" w-full flex flex-col ">
      <header className="flex justify-between   lg:rounded-tr-full lg:rounded-br-full rounded-tr-[10px] lg:rounded-tl-[10px]  rounded-tl-[10px] p-[10px]  bg-crust">
        {/* TODO: اینجا باید سمت چپ بالای هدر گردی بگیره اما خب نمیگیره */}
        <div className="flex justify-center gap-[10px] items-center">
          <Image
            src={Profile}
            alt="farhan"
            className="rounded-full h-[25px] w-[25px]"
          />
          <Text className="text-[14px] font-bold text-subtext-0">فرهان</Text>
          <Text className="font-bold text-sapphire text-[14px] bg-base px-[20px] rounded-[6px]">
            منتور
          </Text>
        </div>
        <section className="flex items-center gap-[10px] ">
          <span className="text-[12px]">2+</span>
          <Button className="bg-teal w-[28px] h-[28px] rounded-[5px] flex justify-center items-center">
            <IncreaseArrow />
          </Button>
          <Button className="bg-maroon flex justify-center items-center w-[28px] h-[28px] rounded-[5px]">
            <DecreaseArrow />
          </Button>
          <Button className="bg-  text-subtext-0">
            <ThreeDotts />
          </Button>
        </section>
      </header>

      <section className="text-[12px] bg-[#101122] lg:mx-[40px] rounded-b-[10px]  gap-y-[15px] flex flex-col  ">
        <p className="p-[10px]">
          مقاله‌ای که به بررسی موضوع بش‌ (۰) پرداخته، به خوبی ابعاد مختلف این
          مفهوم را تحلیل کرده است. با این حال، برخی از نکات کلیدی نادیده گرفته
          شده‌اند که می‌توانستند به عمق بیشتری در بحث کمک کنند. به‌طور کلی، مقاله
          می‌تواند با ارائه مثال‌های عملی و مستندات بیشتر، جذاب‌تر و آموزنده‌تر شود.
          نقد مقاله در مورد بش
        </p>
        <section className="flex items-center text-[12px] justify-between border-b-[1px] border-t-[1px] border-base px-[10px] py-[11.5px]">
          <div className="flex ">
            <Button className="flex rounded-r-[5px] justify-center items-center bg-mantle gap-[6px] text-subtext-0 border-l-[1px] border-surface-1 p-[5px] px-[10px] text-text">
              <Comments />
              پاسخ ها
            </Button>
            <Button className="flex rounded-l-[5px] justify-center items-center gap-[7px] bg-mantle text-subtext-0  p-[5px] px-[10px] text-text">
              <div className="flex flex-col justify-center gap-[5px] text-subtext-0 ">
                <IncreaseArrow className="w-[14px] h-[10px]" />
                <DecreaseArrow className="w-[14px] h-[10px]  " />
                {/* TODO: دوستان ببینید می تونید به این آیکون ها رنگ بدید یا نه */}
              </div>
              دیدن پاورقی
            </Button>
          </div>
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
        <ul className="px-[10px] pb-[20px] text-[10px]">
          <li>
            <span className="text-sapphire">0 : </span> بش یک زبان شل اسکریپتی
            در سیستم های یونیکس بیس هست که نمیدونم برای ارتباط با سیستم عامل و
            اینجور چیزا ساخته شده
          </li>
        </ul>
      </section>
    </article>
  );
}

export default ReviewMessege;