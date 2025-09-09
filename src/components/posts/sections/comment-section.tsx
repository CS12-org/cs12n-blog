import Anonymous from "~/assets/images/anonymous.svg";
import ExclamationMark from "~/assets/images/excalamation.svg";
import Button from "~/components/button";
import { TextInput } from "~/components/user-panel/text-field";
import CommentMessege from "../comment-messages/comment-message";
import HighlightCommentMessege from "../comment-messages/highlight-comment-message";

function CommentSection() {
  return (
    <section className="flex flex-col gap-[25px]">
      <section className="text-[14px] justify-start flex flex-col gap-[10px]  bg-crust rounded-[10px] py-[30px] lg:px-[60px] px-[10px] ">
        <header className=" text-subtext-0 text-[20px] font-extrabold">
          نظرات (۷)
        </header>

        <section className="flex gap-[10px]  items-center pb-[5px]">
          <section className="shadow-inner shadow-[#24273A] flex items-center justify-center h-[35px] w-[35px] rounded-full">
            <Anonymous
              aria-label="آیکون فرد"
              className="bg-crust rounded-full h-[25px] w-[25px]"
            />
          </section>

          <span className="font-bold text-subtext-0">نام فرد</span>
        </section>

        <div className="">
          <TextInput
            className="lg:!p-[15px] border-b-[1px] border-surface-0 lg:h-auto h-[35px] p-[5px] w-full text-[12px] lg:text-[14px] placeholder:text-text text-text"
            name="نقد و نکات"
            aria-label="کامنت خود را نوبیسید"
            placeholder="کامنت خود رو بنویسید ..."
          />
        </div>

        <Button className="bg-blue w-full  lg:h-[52px] h-[35px] font-bold rounded-[10px] text-crust">
          ارسال نقد
        </Button>
      </section>

      <section className="lg:px-[60px] lg:py-[30px] p-[10px] rounded-[10px] bg-crust">
        <div className="flex gap-[10px] items-center lg:p-[15px] px-[10px] py-[15px] rounded-[10px] bg-base  text-[12px] lg:text-[14px]">
          <div className="bg-crust rounded-[10px] lg:h-[48px] lg:w-[48px]  !w-[40px] h-[38px] flex justify-self-start justify-center items-center">
            <ExclamationMark
              fill="#91D7E3"
              className="w-[20px] h-[20px] lg:[26px] lg:[26px]"
            />
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
