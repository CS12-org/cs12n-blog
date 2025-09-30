import { Text } from '@/components/react-aria-components';
import ExclamationMark from '@/assets/images/excalamation.svg';
import { TextInput } from '@/components/user-panel/text-field';
import Button from '@/components/button';

function ChangeCommitMessege() {
  return (
    <section className="text-text flex w-full flex-col bg-[#050615] px-[10px] py-[20px] text-[12px] lg:px-[30px] lg:text-[14px]">
      <section className="flex gap-[10px]">
        <div className="bg-crust flex h-[40px] w-[40px] items-center justify-center rounded-[10px] lg:h-[48px] lg:w-[48px]">
          <ExclamationMark fill="#91D7E3" className="h-[20px] w-[20px]" />
        </div>
        <Text className="ml-[-10px] flex w-full self-center font-bold lg:text-[16px]">بخش هایی رو تغییر دادی چرا؟</Text>
      </section>

      <TextInput className="h-[35px] w-full p-[5px]" placeholder="کامیت خود رو بنویسید" name="نوشتن کامیت" />

      <section className="flex justify-end px-[10px] pt-[10px]">
        <Button className="bg-blue h-[23px] w-[102px] font-bold">ارسال</Button>
      </section>
    </section>
  );
}

export default ChangeCommitMessege;
