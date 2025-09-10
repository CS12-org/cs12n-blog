import Image from 'next/image';
import Cs12Logo from '~/assets/images/cs12-logo.svg';
import PlusSign from '~/assets/images/plus-sign.svg';
import Profile from '~/assets/images/user-profile.png';
import Button from '~/components/button';
import { Text } from '~/components/react-aria-components';
import { SettingCheckboxOption } from '~/components/user-panel/setting-checkbox';
import { TextInput } from '~/components/user-panel/text-field';
import MyRadioGroup from '~/components/user-panel/theme-setting';

function UserPanel() {
  return (
    <main className="text-subtext-1 flex w-full flex-col gap-2.5">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold">اطلاعات اولیه پروفایل</h1>
        <Button className="bg-sapphire text-crust h-[36px] w-[39px] rounded text-sm">ثبت</Button>
      </header>

      <section className="bg-crust flex w-full flex-col rounded-xl">
        <figure className="grid grid-cols-6 grid-rows-1 content-center items-center">
          <div className="bg-mantle flex h-full w-29.5 items-center rounded-tr-xl rounded-bl-[100px] shadow-[_-1px_3px_5px_rgba(0,0,0,0.3)]">
            <Cs12Logo className="mr-1.5" />
          </div>
          <Image
            width={80}
            height={80}
            src={Profile}
            alt="User Profile"
            className="col-start-2 col-end-3 row-start-1 mr-[25px] h-20 w-20 justify-self-start rounded-tl-3xl rounded-tr-[40px] rounded-br-3xl rounded-bl-[40px]"
          />
          <figcaption className="col-start-3 col-end-7 m-2.5 flex flex-col gap-y-2">
            <h2 className="bg-mantle h-13 w-full content-center rounded-md p-2 text-xl font-extrabold">سارا امیری</h2>
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

      <section className="bg-crust flex flex-col gap-y-2.5 rounded-xl p-5">
        <h2 className="text-xs font-bold">تنظیمات رنگ قسمت سمت راست پروفایل :</h2>
        <div className="flex flex-wrap gap-[5px]">
          <MyRadioGroup
            name="theme-color"
            options={[
              {
                label: 'lavender',
                bgColorClass: 'bg-lavender',
                value: 'lavender',
              },
              { label: 'maroon', bgColorClass: 'bg-maroon', value: 'maroon' },
              { label: 'teal', bgColorClass: 'bg-teal', value: 'teal' },
              { label: 'peach', bgColorClass: 'bg-peach', value: 'peach' },
              { label: 'sky', bgColorClass: 'bg-sky', value: 'sky' },
              { label: 'mauve', bgColorClass: 'bg-mauve', value: 'mauve' },
              { label: 'pink', bgColorClass: 'bg-pink', value: 'pink' },
              {
                label: 'flamingo',
                bgColorClass: 'bg-flamingo',
                value: 'flamingo',
              },
            ]}
          />
        </div>
      </section>

      <section className="flex w-full flex-col gap-2">
        <article className="bg-crust flex items-center gap-x-2.5 rounded-xl p-2">
          <Button className="bg-mantle flex h-8 w-8 items-center justify-center rounded-md">
            <PlusSign />
          </Button>
          <Text className="bg-mantle h-9 w-full rounded-md p-2 text-xs">
            زبان ها و تکنولوژی هایی که بلد هستید رو وارد کنید. (به زبان انگلیسی) : مثال c programming language
          </Text>
        </article>

        <article className="bg-crust flex items-center gap-x-2.5 rounded-xl p-2">
          <Button className="bg-mantle flex h-8 w-8 items-center justify-center rounded-md">
            <PlusSign />
          </Button>
          <Text className="bg-mantle h-9 w-full rounded-md p-2 text-xs">
            لینک سوشال میدیا هایی که دارید رو اینجا بزارید.
          </Text>
        </article>

        <article className="bg-crust flex w-full items-center gap-x-2.5 rounded-xl p-2">
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
        <h2 className="text-xl font-extrabold">تنظیمات</h2>
        <fieldset className="bg-crust flex w-full flex-col gap-y-2.5 rounded-xl p-2">
          <SettingCheckboxOption value="sss">
            آیا ۱۰ تا از آخرین نظراتتون در صفحه پروفایلتون توسط دیگران دیده شود؟
          </SettingCheckboxOption>
          <SettingCheckboxOption value="sss1">
            آیا قسمت زبانهایی که بلدید در صفحه پروفایلتون توسط دیگران دیده شود؟
          </SettingCheckboxOption>
          <SettingCheckboxOption value="sss2">
            آیا قسمت هایلایتها و یادداشتهای شیر شده توسط شما در قسمت پروفایلتون قابل مشاهده باشد؟
          </SettingCheckboxOption>
          <SettingCheckboxOption value="sss3">
            آیا قسمت سوشال مدیای شما در پروفایلتون قابل مشاهده توسط دیگران باشد؟
          </SettingCheckboxOption>
          <SettingCheckboxOption value="sss4">
            آیا تصویر پروفایل شما برای دیگران قابل مشاهده باشد؟
          </SettingCheckboxOption>
          <SettingCheckboxOption value="ss5">
            آیا امتیاز و جایگاه شما در چالشهای هفتگی قابل مشاهده باشد؟
          </SettingCheckboxOption>
          <SettingCheckboxOption value="sss6">آیا صفحه پروفایل برای شما ساخته شود؟</SettingCheckboxOption>
        </fieldset>
      </section>

      <section>
        <h2 className="text-xl font-extrabold">درخواست ها</h2>
        <article className="bg-crust flex items-center gap-x-2.5 rounded-xl p-2">
          <Text className="bg-mantle h-9 w-full rounded-md p-2 text-xs">
            شما یک کاربر عادی هستید برای تبدیل شدن به منتور درخواست بدید.
          </Text>
        </article>
      </section>

      <section>
        <h2 className="text-xl font-extrabold">تنظیمات اولیه</h2>
        <form className="flex flex-col gap-2.5">
          <fieldset className="bg-crust grid grid-cols-4 gap-2.5 rounded-xl p-2">
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
              <Button className="bg-crust border-red text-red h-9 w-full border-2 p-2 text-xs">تغییر رمز عبور</Button>
            </div>
          </fieldset>

          <div className="text-crust grid grid-cols-11 gap-2.5 text-xs font-bold">
            <div className="col-span-8">
              <Button className="bg-sapphire h-9 w-full p-2">ثبت</Button>
            </div>
            <div className="col-span-3">
              <Button className="bg-maroon h-9 w-full p-2">بازگشت به تنظیمات پیشفرض</Button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}

export default UserPanel;
