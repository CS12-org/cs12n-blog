import Anonymous from '@/assets/images/anonymous.svg';
import ExclamationMark from '@/assets/images/excalamation.svg';
import Button from '@/components/button';
import { TextInput } from '@/components/user-panel/text-field';
import CommentMessege from '../comment-messages/comment-message';
import HighlightCommentMessege from '../comment-messages/highlight-comment-message';

function CommentSection() {
  return (
    <section className="flex flex-col gap-[25px]">
      <section className="bg-crust flex flex-col justify-start gap-[10px] rounded-[10px] px-[10px] py-[30px] text-[14px] lg:px-[60px]">
        <header className="text-subtext-0 text-[20px] font-extrabold">نظرات (۷)</header>

        <section className="flex items-center gap-[10px] pb-[5px]">
          <section className="flex h-[35px] w-[35px] items-center justify-center rounded-full shadow-inner shadow-[#24273A]">
            <Anonymous aria-label="آیکون فرد" className="bg-crust h-[25px] w-[25px] rounded-full" />
          </section>

          <span className="text-subtext-0 font-bold">نام فرد</span>
        </section>

        <div className="">
          <TextInput
            className="border-surface-0 placeholder:text-text text-text h-[35px] w-full border-b-[1px] p-[5px] text-[12px] lg:h-auto lg:!p-[15px] lg:text-[14px]"
            name="نقد و نکات"
            aria-label="کامنت خود را نوبیسید"
            placeholder="کامنت خود رو بنویسید ..."
          />
        </div>

        <Button className="bg-blue text-crust h-[35px] w-full rounded-[10px] font-bold lg:h-[52px]">ارسال نقد</Button>
      </section>

      <section className="bg-crust rounded-[10px] p-[10px] lg:px-[60px] lg:py-[30px]">
        <div className="bg-base flex items-center gap-[10px] rounded-[10px] px-[10px] py-[15px] text-[12px] lg:p-[15px] lg:text-[14px]">
          <div className="bg-crust flex h-[38px] !w-[40px] items-center justify-center justify-self-start rounded-[10px] lg:h-[48px] lg:w-[48px]">
            <ExclamationMark fill="#91D7E3" className="lg:[26px] lg:[26px] h-[20px] w-[20px]" />
          </div>
          <p className="font-bold">
            برای کامنت گذاشتن باید در سایت
            <span className="text-teal"> ورود </span>
            یا
            <span className="text-teal"> ثبت نام </span>
            کنید.
          </p>
        </div>
      </section>
      <section className="flex flex-col gap-[40px]">
        <CommentMessege />
        <HighlightCommentMessege />
      </section>
    </section>
  );
}

export default CommentSection;
