import { Text } from "~/components/react-aria-components";
import PlusSign from "~/assets/images/plus-sign.svg";
import Button from "~/components/Button";
import { SettingCheckboxOption } from "~/components/UserPanel/SettingCheckbox";
import { TextInput } from "~/components/UserPanel/TextFeild";
import MyRadioGroup from "~/components/UserPanel/ThemeSetting";
import UserPanelList from "~/components/UserPanel/UserPanelList";
import Profile from "~/assets/images/user-profile.png";
import Cs12Logo from "~/components/Icons/cs12-logo.svg";
import Image from "next/image";

function UserPanel() {
  return (
    <section className="flex gap-x-5 w-full items-start">
      <UserPanelList />

      <main className="flex flex-col gap-2.5 w-full text-subtext-1">
        <header className="flex justify-between items-center">
          <h1 className="font-extrabold text-xl">اطلاعات اولیه پروفایل</h1>
          <Button className="bg-sapphire text-sm h-[36px] w-[39px] text-crust rounded">
            ثبت
          </Button>
        </header>

        <section className="bg-crust rounded-xl flex flex-col w-full">
          <figure className="grid grid-cols-6 grid-rows-1 content-center items-center">
            <div className="rounded-tr-xl bg-mantle w-29.5 h-full flex items-center rounded-bl-[100px] shadow-[_-1px_3px_5px_rgba(0,0,0,0.3)]">
              <Cs12Logo className="mr-1.5" />
            </div>
            <Image
              width={80}
              height={80}
              src={Profile}
              alt="User Profile"
              className="w-20 h-20 row-start-1 col-start-2 col-end-3 mr-[25px] justify-self-start rounded-tr-[40px] rounded-bl-[40px] rounded-tl-3xl rounded-br-3xl"
            />
            <figcaption className="col-start-3 col-end-7 flex flex-col gap-y-2 m-2.5">
              <h2 className="p-2 w-full rounded-md content-center bg-mantle h-13 text-xl font-extrabold">
                سارا امیری
              </h2>
              <form className="w-full">
                <TextInput
                  name="توضیح کوتاه از فرد"
                  placeholder="توضیح کوتاهی از خود بنویسید. در حد 200 کارکتر"
                  className="w-full"
                />
              </form>
            </figcaption>
          </figure>
        </section>

        <section className="flex flex-col gap-y-2.5 bg-crust p-5 rounded-xl">
          <h2 className="text-xs font-bold">
            تنظیمات رنگ قسمت سمت راست پروفایل :
          </h2>
          <div className="flex flex-wrap gap-[5px]">
            <MyRadioGroup
              name="theme-color"
              options={[
                {
                  label: "lavender",
                  bgColorClass: "bg-lavender",
                  value: "lavender",
                },
                { label: "maroon", bgColorClass: "bg-maroon", value: "maroon" },
                { label: "teal", bgColorClass: "bg-teal", value: "teal" },
                { label: "peach", bgColorClass: "bg-peach", value: "peach" },
                { label: "sky", bgColorClass: "bg-sky", value: "sky" },
                { label: "mauve", bgColorClass: "bg-mauve", value: "mauve" },
                { label: "pink", bgColorClass: "bg-pink", value: "pink" },
                {
                  label: "flamingo",
                  bgColorClass: "bg-flamingo",
                  value: "flamingo",
                },
              ]}
            />
          </div>
        </section>

        <section className="flex flex-col w-full gap-2">
          <article className="flex items-center gap-x-2.5 bg-crust p-2 rounded-xl">
            <Button className="h-8 w-8 bg-mantle flex justify-center items-center rounded-md">
              <PlusSign />
            </Button>
            <Text className="bg-mantle p-2 w-full rounded-md h-9 text-xs">
              زبان ها و تکنولوژی هایی که بلد هستید رو وارد کنید. (به زبان
              انگلیسی) : مثال c programming language
            </Text>
          </article>

          <article className="flex items-center gap-x-2.5 bg-crust p-2 rounded-xl">
            <Button className="h-8 w-8 bg-mantle flex justify-center items-center rounded-md">
              <PlusSign />
            </Button>
            <Text className="bg-mantle p-2 w-full rounded-md h-9 text-xs">
              لینک سوشال میدیا هایی که دارید رو اینجا بزارید.
            </Text>
          </article>

          <article className="flex items-center gap-x-2.5 bg-crust p-2 rounded-xl w-full">
            <form className="w-full">
              <TextInput
                name="نظر در مورد سایت"
                placeholder="نظرتون رو در مورد این سایت بنویسید. (بعد از ۲۰ روز در این قسمت امکان نوشتن هست)"
                className="w-full"
              />
            </form>
          </article>
        </section>

        <section>
          <h2 className="font-extrabold text-xl">تنظیمات</h2>
          <fieldset className="bg-crust rounded-xl p-2 w-full flex flex-col gap-y-2.5">
            <SettingCheckboxOption value="sss">
              آیا ۱۰ تا از آخرین نظراتتون در صفحه پروفایلتون توسط دیگران دیده
              شود؟
            </SettingCheckboxOption>
            <SettingCheckboxOption value="sss1">
              آیا قسمت زبانهایی که بلدید در صفحه پروفایلتون توسط دیگران دیده
              شود؟
            </SettingCheckboxOption>
            <SettingCheckboxOption value="sss2">
              آیا قسمت هایلایتها و یادداشتهای شیر شده توسط شما در قسمت
              پروفایلتون قابل مشاهده باشد؟
            </SettingCheckboxOption>
            <SettingCheckboxOption value="sss3">
              آیا قسمت سوشال مدیای شما در پروفایلتون قابل مشاهده توسط دیگران
              باشد؟
            </SettingCheckboxOption>
            <SettingCheckboxOption value="sss4">
              آیا تصویر پروفایل شما برای دیگران قابل مشاهده باشد؟
            </SettingCheckboxOption>
            <SettingCheckboxOption value="ss5">
              آیا امتیاز و جایگاه شما در چالشهای هفتگی قابل مشاهده باشد؟
            </SettingCheckboxOption>
            <SettingCheckboxOption value="sss6">
              آیا صفحه پروفایل برای شما ساخته شود؟
            </SettingCheckboxOption>
          </fieldset>
        </section>

        <section>
          <h2 className="font-extrabold text-xl">درخواست ها</h2>
          <article className="flex items-center gap-x-2.5 bg-crust p-2 rounded-xl">
            <Text className="bg-mantle p-2 w-full rounded-md h-9 text-xs">
              شما یک کاربر عادی هستید برای تبدیل شدن به منتور درخواست بدید.
            </Text>
          </article>
        </section>

        <section>
          <h2 className="font-extrabold text-xl">تنظیمات اولیه</h2>
          <form className="flex flex-col gap-2.5">
            <fieldset className="grid grid-cols-4 gap-2.5 bg-crust p-2 rounded-xl">
              <div className="col-start-1 col-end-3">
                <TextInput name="نام کاربری" placeholder="نام کاربری" />
              </div>
              <div className="col-start-3 col-end-5">
                <TextInput name="رمز عبور" placeholder="رمز عبور" />
              </div>
              <div className="col-span-4">
                <TextInput name="ایمیل" placeholder="ایمیل" />
              </div>
              <div className="col-span-4">
                <Button className="bg-crust border-red border-2 w-full p-2 h-9 text-red text-xs">
                  تغییر رمز عبور
                </Button>
              </div>
            </fieldset>

            <div className="grid grid-cols-11 gap-2.5 text-xs font-bold text-crust">
              <div className="col-span-8">
                <Button className="bg-sapphire w-full p-2 h-9">ثبت</Button>
              </div>
              <div className="col-span-3">
                <Button className="bg-maroon w-full p-2 h-9">
                  بازگشت به تنظیمات پیشفرض
                </Button>
              </div>
            </div>
          </form>
        </section>
      </main>
    </section>
  );
}

export default UserPanel;
