"use client"


import { Button } from "react-aria-components";
import Close from "~/assets/images/close.svg";
import Eye from "~/assets/images/eye.svg";
import Comments from "~/assets/images/comments.svg";
import Trash from "~/assets/images/trash.svg"
export default function UserNotesHighlightsTab() {
    return (
        <section className="w-full flex flex-col gap-[10px] text-text text-[12px]">
            <section className="p-[10px] w-full gap-[10px] flex justify-between items-start bg-mantle rounded-[10px]">

                <p className="text-[12px] text-subtext-0 w-full" >
                    در اینجا هایلایت ها و یاد داشت هایی که به اشتراک گذاشتید نمایش داده میشود میتوانید نظرات رو بررسی کنید با کلیک بر روی هر کدام به صفحه ی پست مورد نظر بروید  و ادیت کنید و دوباره شیر کنید و حتی از همه مهم تر میتوانید هایلایت ها و یاد داشت هایی که دیگر نمیخواهید شیر شده باشند رو از حالت شیر بردارید.
                </p>
                <span className="bg-crust w-[23px] h-[23px] rounded-[5px] flex items-center justify-center">
                    <Close />
                </span>
            </section>


            <section className="w-full  ">

                <section className="bg-[#060818]  py-2.5 flex items-stretch w-full rounded-t-[10px]  ">
                    <div aria-hidden className="w-[3px] shrink-0 bg-teal " />
                    <p className="truncate text-subtext-0 grow px-2.5">
                        <span className="font-bold">متعلق به پست: </span>

                        عنوان پست
                    </p>
                </section>
                <section className="flex justify-between bg-[#101122] p-[10px] pt-[15px] rounded-b-[10px]">
                    <Button
                        className="bg-mantle rounded-[5px] w-[93px] h-[36px] flex items-center px-[10px] py-[5px] gap-[5px]"
                        aria-label="مشاهده کامنت"
                    >
                        <Eye />
                        مشاهده
                    </Button>

                    <section className="flex items-center gap-[10px]">
                        <Button aria-label="حذف کامنت">
                            <Trash />
                        </Button>

                        <Button
                            className="flex gap-[3px] items-center"
                            aria-label="مشاهده 12 کامنت"
                        >
                            12
                            <Comments />
                        </Button>
                    </section>

                </section>
            </section>
            <section className="w-full  ">

                <section className="bg-[#060818]  py-2.5 flex items-stretch w-full rounded-t-[10px]  ">
                    <div aria-hidden className="w-[3px] shrink-0 bg-teal " />
                    <p className="truncate text-subtext-0 grow px-2.5">
                        <span className="font-bold">متعلق به پست: </span>

                        عنوان پست
                    </p>
                </section>
                <section className="flex justify-between  bg-[#101122]  p-[10px] pt-[15px] rounded-b-[10px]">
                    <Button
                        className="bg-mantle rounded-[5px] w-[93px] h-[36px] flex items-center px-[10px] py-[5px] gap-[5px]"
                        aria-label="مشاهده کامنت"
                    >
                        <Eye />
                        مشاهده
                    </Button>

                    <section className="flex items-center gap-[10px]">
                        <Button aria-label="حذف کامنت">
                            <Trash />
                        </Button>

                        <Button
                            className="flex gap-[3px] items-center"
                            aria-label="مشاهده 12 کامنت"
                        >
                            12
                            <Comments />
                        </Button>
                    </section>

                </section>
            </section>
            <section className="w-full  ">

                <section className="bg-[#060818]  py-2.5 flex items-stretch w-full rounded-t-[10px]  ">
                    <div aria-hidden className="w-[3px] shrink-0 bg-teal " />
                    <p className="truncate text-subtext-0 grow px-2.5">
                        <span className="font-bold">متعلق به پست: </span>

                        عنوان پست
                    </p>
                </section>
                <section className="flex justify-between  bg-[#101122]  p-[10px] pt-[15px] rounded-b-[10px]">
                    <Button
                        className="bg-mantle rounded-[5px] w-[93px] h-[36px] flex items-center px-[10px] py-[5px] gap-[5px]"
                        aria-label="مشاهده کامنت"
                    >
                        <Eye />
                        مشاهده
                    </Button>

                    <section className="flex items-center gap-[10px]">
                        <Button aria-label="حذف کامنت">
                            <Trash />
                        </Button>

                        <Button
                            className="flex gap-[3px] items-center"
                            aria-label="مشاهده 12 کامنت"
                        >
                            12
                            <Comments />
                        </Button>
                    </section>

                </section>
            </section>


        </section>

    )
}
