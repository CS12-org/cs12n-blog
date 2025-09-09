import { Text } from "~/components/react-aria-components";
import ExclamationMark from "~/assets/images/excalamation.svg";
import { TextInput } from "~/components/user-panel/text-field";
import Button from "~/components/button";

function ChangeCommitMessege() {
  return (
    <section className="bg-[#050615] text-text flex  flex-col px-[10px] lg:px-[30px] w-full py-[20px] text-[12px] lg:text-[14px]">
      <section className="flex gap-[10px]">
        <div className="bg-crust rounded-[10px] w-[40px] h-[40px] lg:h-[48px] lg:w-[48px]  flex items-center justify-center">
          <ExclamationMark fill="#91D7E3" className="w-[20px] h-[20px]" />
        </div>
        <Text
          className="w-full lg:text-[16px] 
             flex ml-[-10px] font-bold  self-center"
        >
          بخش هایی رو تغییر دادی چرا؟
        </Text>
      </section>

      <TextInput
        className="w-full h-[35px] p-[5px] "
        placeholder="کامیت خود رو بنویسید"
        name="نوشتن کامیت"
      />

      <section className="flex justify-end px-[10px] pt-[10px]">
        <Button className="w-[102px] h-[23px] bg-blue  font-bold ">
          ارسال
        </Button>
      </section>
    </section>
  );
}

export default ChangeCommitMessege;
