import { Text } from "~/components/react-aria-components";
import ExclamationMark from "~/assets/images/excalamation.svg";
import { TextInput } from "~/components/user-panel/text-field";
import Button from "~/components/button";

export default function CommitMessegeInput() {
  return (
    <section className="bg-[#050615] text-text flex flex-col px-[10px] lg:px-[30px] w-full py-[20px] text-[12px] lg:text-[14px]">
      <section className="flex gap-[10px] ">
        <span className="bg-crust  rounded-[10px] w-[40px] lg:w-[48px] h-[40px] lg:h-[48px]   flex items-center justify-center">
          <ExclamationMark fill="#91D7E3" width="20px" height="20px" />
        </span>
        <Text
          className="w-full lg:text-[16px] 
             flex ml-[-10px] font-bold   self-center"
        >
          چرا به اشتراک میگذارید؟
        </Text>
      </section>

      <div className=" ">
        <TextInput
          className="w-full h-[35px] p-[5px] "
          placeholder="کامیت خود رو بنویسید"
          name="نوشتن کامیت"
        />
      </div>

      <section className="flex justify-end px-[10px] pt-[10px]">
        <Button className="w-[102px] h-[23px] bg-blue font-bold  ">
          ارسال
        </Button>
      </section>
    </section>
  );
}
