import Image from 'next/image';
import Close from '~/assets/images/close.svg';
import ExcalamationMark from '~/assets/images/excalamation.svg';
import Profile from '~/assets/images/farhan.jpg';
import Button from '~/components/button';
import { Text } from '~/components/react-aria-components';

export default function NotesSideBar() {
  return (
    <section className="bg-crust flex w-[450px] flex-col gap-[10px] rounded-[10px] p-[10px]">
      <header className="flex items-center justify-between">
        <h1 className="text-[18px] font-bold">یاد داشت های شما</h1>
        <Close />
      </header>

      <article className="flex w-full flex-col">
        <header className="bg-mantle flex justify-between rounded-tl-[10px] rounded-tr-[10px] p-[10px]">
          <div className="flex items-center justify-center gap-[10px]">
            <Image src={Profile} alt="farhan" className="h-[25px] w-[25px] rounded-full" />
            <Text className="text-subtext-0 text-[14px]">یادداشت ۱</Text>
          </div>
          <div className="bg-base flex h-[23px] w-[23px] justify-center rounded-[3px]">
            <ExcalamationMark className="text-sapphire h-[13px] w-[13px] self-center" />
          </div>
        </header>
        <section className="text-sub-text-1 bg-base flex w-full flex-col gap-y-[15px] rounded-b-[10px] p-[10px] text-[16px]">
          <p>اینجا متن یادداشت من هست که این سکشن رو سکسی و جذاب کرده اوه شت یسسسس!</p>
          <section className="flex justify-end gap-[10px] text-[12px]">
            <Button className="bg- text-teal">ویرایش</Button>
            <Button className="bg- text-red">حذف</Button>
          </section>
        </section>
      </article>

      <article className="flex w-full flex-col">
        <header className="bg-mantle flex justify-between rounded-tl-[10px] rounded-tr-[10px] p-[10px]">
          <div className="flex items-center justify-center gap-[10px]">
            <Text className="text-subtext-0 text-[14px]">مطمعنی میخوای حذف کنی؟</Text>
          </div>
          <div className="bg-base flex h-[23px] w-[23px] justify-center rounded-[3px]">
            <ExcalamationMark className="text-red h-[13px] w-[13px] self-center" />
          </div>
        </header>
        <section className="text-sub-text-1 bg-base flex w-full flex-col gap-y-[15px] rounded-b-[10px] p-[10px] text-[16px]">
          <section className="text-mantle flex justify-start gap-[10px] text-[16px]">
            <Button className="bg- bg-sapphire h-[28px] w-[56px]">آره</Button>
            <Button className="bg- bg-red h-[28px] w-[56px]">نه</Button>
          </section>
        </section>
      </article>
    </section>
  );
}
