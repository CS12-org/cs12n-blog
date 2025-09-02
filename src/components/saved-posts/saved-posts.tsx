import Save from "~/assets/images/save.svg"
import Close from "~/assets/images/close.svg"
import Stopwatch from "~/assets/images/stopwatch.svg"

export default function SavedPost() {
  return (
    <section className="flex flex-col gap-[10px]">
   <section className="p-[10px] w-full gap-[10px] flex justify-between items-start bg-mantle rounded-[10px]">
        <p className="text-body-sm text-subtext-0 w-full">
       در اینجا پست های ذخیره شده شما نمایش داده میشود. شما میتوانید تا سقف ۱۵ پست را ذخیره کنید تا بعدا مطالعه کنید. هر پست به مدت ۱۰ روز در لیست ذخیره های شما باقی می ماند. و پس از روز ۱۰ ام حذف میشود چرا که اگر میخواستید مطالعه کنید طی این ۱۰ روز مطالعه میکردید.
        </p>
        <span className="bg-crust w-[23px] h-[23px] rounded-[5px] flex items-center justify-center">
          <Close />
        </span>
      </section>

<span className="text-subtext-1 text-[12px]">( ۳ از ۱۵ ) </span>

<section className="px-[20px] py-[10px] bg-crust text-white flex justify-between rounded-[10px] items-center">
<h2>عنوان پستی که ذخیره کردید</h2>
<section className="flex gap-[10px]">
<button className="bg-base rounded-full flex items-center justify-center w-[38px] h-[38px]"><Stopwatch/></button>
<button className="bg-base rounded-[5px] flex items-center justify-center  w-[38px] h-[38px]"><Save stroke="#8AADF4" fill="#8AADF4" className="h-[28px]  w-[28px]"/></button>

</section>
</section>
     </section>
  );
}

