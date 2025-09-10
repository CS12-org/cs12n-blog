import Image from 'next/image';
import { FaXTwitter } from 'react-icons/fa6';
import { FiGithub, FiYoutube } from 'react-icons/fi';
import { PiTelegramLogoDuotone } from 'react-icons/pi';
import { SlSocialLinkedin } from 'react-icons/sl';

type User = {
  username: string;
  email: string;
  avatarUrl?: string | null;
  bio?: string | null;
} | null;

function PostAuthor({ user }: { user: User }) {
  const isAnonymous = !user;

  const username = isAnonymous ? 'نویسنده ناشناس' : user.username;
  const avatarUrl = isAnonymous
    ? '/default-avatar.png' // یه عکس پیش‌فرض بذار توی public
    : user.avatarUrl || '/default-avatar.png';
  const bio = isAnonymous ? 'اطلاعاتی از نویسنده در دسترس نیست.' : user.bio || '';

  return (
    <section className="bg-mantle text-text flex flex-col gap-[10px] rounded-[10px] p-[10px] lg:px-[50px] lg:py-[20px]">
      <div className="flex items-center gap-[10px]">
        <Image
          alt={username}
          src={avatarUrl}
          width={40}
          height={40}
          className="border-crust h-[40px] w-[40px] rounded-full border-[5px]"
        />
        <h3 className="text-[16px] font-extrabold lg:text-[20px]">{username}</h3>
      </div>

      {bio && <p className="text-[14px] lg:text-[16px]">{bio}</p>}

      <div className="flex flex-row-reverse justify-start gap-[10px]">
        <PiTelegramLogoDuotone className="h-[24px] w-[24px] lg:h-[28px] lg:w-[28px]" />
        <FaXTwitter className="h-[24px] w-[24px] lg:h-[28px] lg:w-[28px]" />
        <FiYoutube className="h-[24px] w-[24px] lg:h-[28px] lg:w-[28px]" />
        <FiGithub className="h-[24px] w-[24px] lg:h-[28px] lg:w-[28px]" />
        <SlSocialLinkedin className="h-[24px] w-[24px] lg:h-[28px] lg:w-[28px]" />
      </div>
    </section>
  );
}

export default PostAuthor;
