import Anonymous from '~/assets/images/anonymous.svg';
import Close from '~/assets/images/close.svg';
import ExclamationMark from '~/assets/images/excalamation.svg';
import Picture from '~/assets/images/picture-gallery.svg';
import PlusSign from '~/assets/images/plus-sign.svg';
import { Button, Text } from '~/components/react-aria-components';
import { TextInput } from '~/components/user-panel/text-field';
import ReviewMessege from '../comment-messages/review-message';

function ReviewSection() {
  return (
    <section className="text-text flex flex-col gap-[10px]">
      <header className="bg-crust text-subtext-0 flex w-full justify-center rounded-[10px] p-[20px] text-[20px] font-extrabold lg:justify-start">
        نقد و بررسی و نکات تکمیلی
      </header>
      <section className="bg-crust flex flex-col gap-[15px] rounded-[10px] p-[10px] lg:px-[20px] lg:py-[28px]">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-[5px]">
            <div className="bg-mantle flex h-[38px] w-[38px] items-center justify-center rounded-full">
              <ExclamationMark fill="#ED8796" className="h-[28px] w-[28pc]" />
            </div>
            <Text className="text-maroon text-[16px] font-extrabold lg:text-[20px]">توجه !</Text>
          </div>
          <Button className="bg-base flex h-[23px] w-[23px] items-center justify-center rounded-[4px]">
            <Close />
          </Button>
        </header>
        <article className="text-text flex flex-col gap-[15px] text-[12px] lg:text-[16px]">
          <p>
            منتور عزیز ، سپاس از این که این کامیونیتی رو همراهی میکنی چند نکته برای کمک به نوشتن هر چه بهتر و سودمند تر
            برای افراد حاضر در این کامیونیتی وجود داره که براتون لیستش میکنم.
          </p>
          <ul className="list-disc px-[20px]">
            <li>
              لطفا اگر از کلمات تخصصی ای استفاده میکنید . توضیحی برای اون کلمات در بخش کلمات تخصصی باز کنید که به شکل
              پاورقی استفاده بشوند.
            </li>
            <li>اگر تصویری دارید لطفا تصویر رو با استفاده از این لینک به حجم ۳ مگابایت یا کمتر در بیاورید.</li>
            <li>اگر در تکمیل مقاله مطلبی دارید لطفا ذکر کنید</li>
            <li>
              اگر در رابطه با بخشی از مقاله صحبتی دارید لطفا اون بخش رو هایلایت کنید و سپس گزینه نقد و بررسی رو بزنید.
            </li>
            <li>لطفا سعی کنید تا میشود مطالبتان توضیحی باشد و صرفا فرسته ای از کلمات تخصصی و مطالب تخصصی نباشد.</li>
            <li>نقد ها و بررسی ها بدون تایید ما گذاشته میشوند پس سعی کنید با رعایت ادب نقد کنید سپاس.</li>
          </ul>
        </article>
      </section>

      <section className="bg-crust rounded-[10px] p-[10px] text-[14px] lg:px-[60px] lg:pb-[30px]">
        <section className="grid grid-cols-14 grid-rows-5 gap-x-[5px] lg:grid-rows-4">
          <section className="flex items-end gap-[10px] pb-[5px]">
            <section className="flex h-[35px] w-[35px] items-center justify-center rounded-full shadow-inner shadow-[#24273A]">
              <Anonymous aria-label="آیکون فرد" className="bg-crust h-[25px] w-[25px] rounded-full" />
            </section>

            <span className="text-subtext-0 mb-[8px] flex-1 font-bold whitespace-nowrap">نام فرد</span>
          </section>
          <div className="col-start-1 col-end-13 row-start-2 row-end-2 lg:col-end-14">
            <TextInput
              className="border-surface-0 placeholder:text-text text-text h-[35px] w-full border-b-[1px] !p-[15px] text-[12px] lg:h-auto lg:text-[14px]"
              name="نقد و نکات"
              placeholder="نقد و نکات تکمیلی رو اینجا بنویسید ..."
            />
          </div>
          <Button className="bg-base col-start-13 col-end-15 row-start-2 row-end-2 flex h-[35px] w-[35px] items-center justify-center self-center justify-self-center rounded-[10px] lg:col-start-14 lg:h-[48px] lg:w-[48px] lg:self-center">
            <Picture className="w-[22px]" />
          </Button>
          <span className="text-subtext-0 col-start-1 col-end-8 row-start-3 row-end-3 self-center font-bold lg:col-end-4">
            ریفرنس یا پاورقی بسازید:{' '}
          </span>
          <div className="bg-base col-start-7 row-start-3 row-end-3 mr-[-10px] flex h-[26px] w-[26px] items-center justify-center self-center justify-self-start rounded-full lg:col-start-4 lg:justify-self-start">
            <ExclamationMark fill="#91D7E3" className="h-[20px] w-[6px]" />
          </div>
          <Button className="bg-mantle col-start-1 col-end-3 row-start-4 row-end-4 flex h-[35px] w-[35px] items-center justify-center self-center justify-self-center rounded-md lg:col-end-1 lg:!h-[48px] lg:!w-[48px]">
            <PlusSign className="w-[20px] lg:h-[28px] lg:w-[28px]" />
          </Button>
          <div className="col-start-3 col-end-15 row-start-4 row-end-4 self-center lg:col-start-2 lg:col-end-5">
            <TextInput
              className="border-surface-0 placeholder:text-text text-text h-[35px] w-full border-b-[1px] !p-[15px] text-[12px] lg:h-auto lg:text-[14px]"
              name="نقد و نکات"
              placeholder="نام کلمه یا عدد ریفرنس"
            />
          </div>
          <div className="col-start-1 col-end-15 row-start-5 self-center lg:col-start-5 lg:row-start-4 lg:row-end-4">
            <TextInput
              className="border-surface-0 placeholder:text-text text-text h-[35px] w-full border-b-[1px] !p-[15px] text-[12px] lg:h-auto lg:text-[14px]"
              name="نقد و نکات"
              placeholder="توضیح کلمه تخصصی یا لینک ..."
            />
          </div>
        </section>
        <Button className="bg-blue text-crust mt-[15px] h-[35px] w-full rounded-[10px] font-bold lg:h-[52px]">
          ارسال نقد
        </Button>
      </section>

      <section className="bg-crust rounded-[10px] p-[10px] lg:px-[60px] lg:py-[30px]">
        <div className="bg-base flex items-center gap-[10px] rounded-[10px] px-[10px] py-[15px] text-[12px] lg:p-[15px] lg:text-[14px]">
          <div className="bg-crust flex h-[38px] !w-[40px] items-center justify-center justify-self-start rounded-[10px] lg:h-[48px] lg:w-[48px]">
            <ExclamationMark fill="#91D7E3" className="lg:[26px] lg:[26px] h-[20px] w-[20px]" />
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
