import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { FiGithub, FiYoutube } from "react-icons/fi";
import { PiTelegramLogoDuotone } from "react-icons/pi";
import { SlSocialLinkedin } from "react-icons/sl";

type User = {
  username: string;
  email: string;
  avatarUrl?: string | null;
  bio?: string | null;
} | null;

function PostAuthor({ user }: { user: User }) {
  const isAnonymous = !user;

  const username = isAnonymous ? "نویسنده ناشناس" : user.username;
  const avatarUrl = isAnonymous
    ? "/default-avatar.png" // یه عکس پیش‌فرض بذار توی public
    : user.avatarUrl || "/default-avatar.png";
  const bio = isAnonymous
    ? "اطلاعاتی از نویسنده در دسترس نیست."
    : user.bio || "";

  return (
    <section className="flex flex-col bg-mantle rounded-[10px] p-[10px] lg:px-[50px] lg:py-[20px] text-text gap-[10px]">
      <div className="flex items-center gap-[10px]">
        <Image
          alt={username}
          src={avatarUrl}
          width={40}
          height={40}
          className="rounded-full h-[40px] w-[40px] border-crust border-[5px]"
        />
        <h3 className="font-extrabold lg:text-[20px] text-[16px]">
          {username}
        </h3>
      </div>

      {bio && <p className="lg:text-[16px] text-[14px]">{bio}</p>}

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
