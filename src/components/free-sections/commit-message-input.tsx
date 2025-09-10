import { Text } from '~/components/react-aria-components';
import ExclamationMark from '~/assets/images/excalamation.svg';
import { TextInput } from '~/components/user-panel/text-field';
import Button from '~/components/button';

export default function CommitMessegeInput() {
  return (
    <section className="text-text flex w-full flex-col bg-[#050615] px-[10px] py-[20px] text-[12px] lg:px-[30px] lg:text-[14px]">
      <section className="flex gap-[10px]">
        <span className="bg-crust flex h-[40px] w-[40px] items-center justify-center rounded-[10px] lg:h-[48px] lg:w-[48px]">
          <ExclamationMark fill="#91D7E3" width="20px" height="20px" />
        </span>
        <Text className="ml-[-10px] flex w-full self-center font-bold lg:text-[16px]">چرا به اشتراک میگذارید؟</Text>
      </section>

      <div className=" ">
        <TextInput className="h-[35px] w-full p-[5px]" placeholder="کامیت خود رو بنویسید" name="نوشتن کامیت" />
      </div>

      <section className="flex justify-end px-[10px] pt-[10px]">
        <Button className="bg-blue h-[23px] w-[102px] font-bold">ارسال</Button>
      </section>
    </section>
  );
}
