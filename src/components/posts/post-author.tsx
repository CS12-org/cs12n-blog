import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { FiGithub, FiYoutube } from "react-icons/fi";
import { PiTelegramLogoDuotone } from "react-icons/pi";
import { SlSocialLinkedin } from "react-icons/sl";
import Profile from "~/assets/images/farhan.jpg";

function PostAuthor() {
  return (
    <section className="flex flex-col bg-mantle rounded-[10px] p-[10px] lg:px-[50px] lg:py-[20px] text-text gap-[10px]">
      <div className="flex items-center gap-[10px]">
        <Image
          alt="farhan"
          src={Profile}
          className="rounded-full h-[40px] w-[40px] border-crust border-[5px]"
        />
        <h3 className="font-extrabold lg:text-[20px] text-[16px]">
          فرهان هستم!
        </h3>
      </div>
      <p className="lg:text-[16px] text-[14px]">
        علاقه مند به زبان سی و ریاضیات و دیزاین الگوریتم هستم همینطور به بش
        اسکریپت هم علاقه دارم.
      </p>
      <div className="flex flex-row-reverse justify-start gap-[10px]">
        <PiTelegramLogoDuotone className="lg:h-[28px] lg:w-[28px] w-[24px] h-[24px]" />
        <FaXTwitter className="lg:h-[28px] lg:w-[28px] w-[24px] h-[24px]" />
        <FiYoutube className="lg:h-[28px] lg:w-[28px] w-[24px] h-[24px]" />
        <FiGithub className="lg:h-[28px] lg:w-[28px] w-[24px] h-[24px]" />
        <SlSocialLinkedin className="lg:h-[28px] lg:w-[28px] w-[24px] h-[24px]" />
      </div>
    </section>
  );
}

export default PostAuthor;