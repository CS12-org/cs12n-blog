'use client';

import { Button } from 'react-aria-components';
import Close from '@/assets/images/close.svg';
import Eye from '@/assets/images/eye.svg';
import Comments from '@/assets/images/comments.svg';
import Trash from '@/assets/images/trash.svg';

export default function UserNotesHighlightsTab() {
  return (
    <section className="text-text text-body-sm flex w-full flex-col gap-[10px]">
      <section className="bg-mantle flex w-full items-start justify-between gap-[10px] rounded-[10px] p-[10px]">
        <p className="text-body-sm text-subtext-0 w-full">
          در اینجا هایلایت ها و یاد داشت هایی که به اشتراک گذاشتید نمایش داده میشود میتوانید نظرات رو بررسی کنید با کلیک
          بر روی هر کدام به صفحه ی پست مورد نظر بروید و ادیت کنید و دوباره شیر کنید و حتی از همه مهم تر میتوانید هایلایت
          ها و یاد داشت هایی که دیگر نمیخواهید شیر شده باشند رو از حالت شیر بردارید.
        </p>
        <button className="bg-crust flex h-[23px] w-[23px] items-center justify-center rounded-[5px]">
          <Close />
        </button>
      </section>

      <article className="w-full">
        <header className="flex w-full items-stretch rounded-t-[10px] bg-[#060818] py-2.5">
          <div aria-hidden className="bg-teal w-[3px] shrink-0" />
          <h2 className="text-subtext-0 grow truncate px-2.5 text-sm">
            <span className="font-bold">متعلق به پست: </span>
            عنوان پست
          </h2>
        </header>

        <footer className="flex justify-between rounded-b-[10px] bg-[#101122] p-[10px] pt-[15px]">
          <Button
            className="bg-mantle flex h-[36px] w-[93px] items-center gap-[5px] rounded-[5px] px-[10px] py-[5px]"
            aria-label="مشاهده کامنت"
          >
            <Eye className="h-[28px] w-[28px]" />
            مشاهده
          </Button>

          <div className="flex items-center gap-[10px]">
            <Button aria-label="حذف کامنت">
              <Trash />
            </Button>

            <Button className="flex items-center gap-[3px]" aria-label="مشاهده 12 کامنت">
              12
              <Comments className="h-[29px] w-[29px]" />
            </Button>
          </div>
        </footer>
      </article>
    </section>
  );
}
