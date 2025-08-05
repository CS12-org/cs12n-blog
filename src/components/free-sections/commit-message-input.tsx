import { Text } from "~/components/react-aria-components";
import ExclamationMark from "~/assets/images/excalamation.svg";
import { TextInput } from "~/components/user-panel/text-field";
import Button from "~/components/button";

export default function ShareHighlightsPrompt() {
  return (
    <section className="bg-[#050615] px-[10px] lg:px-[30px] w-full py-[10px] text-[12px] lg:text-[14px] gap-y-[px]  grid grid-cols-6 lg:grid-cols-12 grid-rows-3 ">
      <div className="bg-crust row-start-1 self-center row-end-1 rounded-[10px] w-[40px] h-[40px] lg:h-[48px] lg:w-[48px]  flex items-center justify-center">
        <ExclamationMark fill="#91D7E3" className=" w-[20px] h-[20px]" />
      </div>
      <Text
        className="w-[285px] lg:w-[800px] row-start-1 row-end-1 lg:text-[16px] lg:col-start-2
             flex ml-[-10px] lg:col-end-11 font-bold  col-start-2 col-end-6 lg:mr-[10px] self-center"
      >
        چرا به اشتراک میگذارید؟
      </Text>
      <div className="row-start-2 row-end-2 col-start-1 col-end-7 self-center lg:col-end-14 ">
        <TextInput
          className="w-full h-[35px] p-[5px] "
          placeholder="کامیت خود رو بنویسید"
          name="نوشتن کامیت"
        />
      </div>

      <Button className="w-[102px] h-[23px] bg-blue  font-bold col-start-6 justify-self-end self-center row-start-3 lg:col-start-12 ">
        ارسال
      </Button>
    </section>
  );
}
