import { Button, Text } from "~/components/react-aria-components";
import Anonymous from "~/assets/images/anonymous.svg";
import Close from "~/assets/images/close.svg";
import ExclamationMark from "~/assets/images/excalamation.svg";
import Picture from "~/assets/images/picture-gallery.svg";
import PlusSign from "~/assets/images/plus-sign.svg";
import { TextInput } from "~/components/user-panel/text-field";
import ReviewMessege from "../comment-messages/review-message";

function ReviewSection() {
  return (
    <section className="text-text flex flex-col gap-[10px]">
      <header className="bg-crust flex  justify-center lg:justify-start text-subtext-0 rounded-[10px]  w-full p-[20px] font-extrabold text-[20px]">
        نقد و بررسی و نکات تکمیلی
      </header>
      <section className="flex flex-col  rounded-[10px] bg-crust gap-[15px]  lg:py-[28px] p-[10px] lg:px-[20px]">
        <header className="flex justify-between items-center">
          <div className="flex gap-[5px] items-center">
            <div className="bg-mantle  rounded-full w-[38px] h-[38px] flex justify-center items-center">
              <ExclamationMark fill="#ED8796" className="w-[28pc] h-[28px]" />
            </div>
            <Text className="text-maroon  font-extrabold lg:text-[20px] text-[16px]">
              توجه !
            </Text>
          </div>
          <Button className="bg-base  flex items-center justify-center rounded-[4px] w-[23px] h-[23px] ">
            <Close />
          </Button>
        </header>
        <article className="flex flex-col gap-[15px] text-text lg:text-[16px] text-[12px]">
          <p>
            منتور عزیز ، سپاس از این که این کامیونیتی رو همراهی میکنی چند نکته
            برای کمک به نوشتن هر چه بهتر و سودمند تر برای افراد حاضر در این
            کامیونیتی وجود داره که براتون لیستش میکنم.
          </p>
          <ul className="list-disc px-[20px]">
            <li>
              لطفا اگر از کلمات تخصصی ای استفاده میکنید . توضیحی برای اون کلمات
              در بخش کلمات تخصصی باز کنید که به شکل پاورقی استفاده بشوند.
            </li>
            <li>
              اگر تصویری دارید لطفا تصویر رو با استفاده از این لینک به حجم ۳
              مگابایت یا کمتر در بیاورید.
            </li>
            <li>اگر در تکمیل مقاله مطلبی دارید لطفا ذکر کنید</li>
            <li>
              اگر در رابطه با بخشی از مقاله صحبتی دارید لطفا اون بخش رو هایلایت
              کنید و سپس گزینه نقد و بررسی رو بزنید.
            </li>
            <li>
              لطفا سعی کنید تا میشود مطالبتان توضیحی باشد و صرفا فرسته ای از
              کلمات تخصصی و مطالب تخصصی نباشد.
            </li>
            <li>
              نقد ها و بررسی ها بدون تایید ما گذاشته میشوند پس سعی کنید با رعایت
              ادب نقد کنید سپاس.
            </li>
          </ul>
        </article>
      </section>

      <section className="text-[14px] bg-crust rounded-[10px] lg:pb-[30px] lg:px-[60px] p-[10px] ">
<section className=" gap-x-[5px]  grid lg:grid-rows-4 grid-rows-5 grid-cols-14 ">
<section className="flex gap-[10px]  items-end pb-[5px] ">
           <section className="shadow-inner shadow-[#24273A] flex items-center justify-center h-[35px] w-[35px] rounded-full">
          <Anonymous aria-lable="آیکون فرد" className="bg-crust rounded-full h-[25px] w-[25px]"/>
           </section>

          <span className="font-bold text-subtext-0 flex-1 whitespace-nowrap mb-[8px]">نام فرد</span>
        </section>
        <div className="row-start-2 row-end-2 col-start-1 col-end-13 lg:col-end-14 ">
          <TextInput
            className="!p-[15px] border-b-[1px] border-surface-0   lg:h-auto h-[35px] w-full lg:text-[14px] text-[12px] placeholder:text-text text-text   "
            name="نقد و نکات"
            placeholder="نقد و نکات تکمیلی رو اینجا بنویسید ..."
          />
        </div>
        <Button className="row-start-2 justify-self-start self-center row-end-2 col-start-13 lg:col-start-14 col-end-15 bg-base rounded-[10px] lg:h-[48px] lg:w-[48px] w-[35px] h-[35px] lg:self-center justify-self-center flex justify-center items-center">
          <Picture className="w-[22px]" />
        </Button>
        <span className="row-start-3 row-end-3 col-start-1 col-end-8 lg:col-end-4 self-center font-bold text-subtext-0">
          ریفرنس یا پاورقی بسازید:{" "}
        </span>
        <div className="bg-base row-start-3 row-end-3 col-start-7 lg:col-start-3 lg:justify-self-end justify-self-start  self-center rounded-full h-[26px] w-[26px] flex justify-center items-center">
          <ExclamationMark fill="#91D7E3" className="h-[20px] w-[6px]" />
        </div>
        <Button className="lg:!h-[48px] self-center justify-self-center lg:!w-[48px] w-[35px] h-[35px] row-start-4 row-end-4 col-start-1 lg:col-end-1 col-end-3 bg-mantle flex justify-center items-center rounded-md">
          <PlusSign className="lg:w-[28px] lg:h-[28px] w-[20px]" />
        </Button>
        <div className="row-start-4 row-end-4 col-start-3 col-end-15 self-center  lg:col-start-2 lg:col-end-5 ">
          <TextInput
            className=" lg:text-[14px] border-b-[1px] border-surface-0 text-[12px] lg:h-auto h-[35px] !p-[15px] w-full placeholder:text-text text-text"
            name="نقد و نکات"
            placeholder="نام کلمه یا عدد ریفرنس"
          />
        </div>
        <div className="lg:row-start-4 lg:row-end-4 row-start-5 col-start-1 lg:col-start-5 col-end-15 self-center">
          <TextInput
            className=" lg:text-[14px] border-b-[1px] border-surface-0 text-[12px]  lg:h-auto h-[35px] !p-[15px] w-full  placeholder:text-text text-text"
            name="نقد و نکات"
            placeholder="توضیح کلمه تخصصی یا لینک ..."
          />
        </div>
</section>
        <Button className="bg-blue  w-full  mt-[15px]  lg:h-[52px] h-[35px] font-bold rounded-[10px] text-crust">
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
            برای گذاشتن نقد و بررسی باید در سایت با نقش
            <span className="text-maroon"> منتور </span>
            <span className="text-teal"> ورود </span>
            یا
            <span className="text-teal"> ثبت نام </span>
            کنید.
          </p>
        </div>
      </section>

      <ReviewMessege />
    </section>
  );
}

export default ReviewSection;
