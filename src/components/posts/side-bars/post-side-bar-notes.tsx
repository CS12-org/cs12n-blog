import Close from "~/assets/images/close.svg";
import Image from "next/image";
import { Text } from "~/components/react-aria-components";
import CommentsIcon from "~/assets/images/comments.svg";
import DecreaseArrow from "~/assets/images/decreaseArrow.svg";
import Profile from "~/assets/images/farhan.jpg";
import IncreaseArrow from "~/assets/images/increaseArrow.svg";
import ThreeDotts from "~/assets/images/threeDotts.svg";
import Button from "~/components/button";
import ExcalamationMark from "~/assets/images/excalamation.svg"

export default function NotesSideBar(){
return(
<section className="bg-crust rounded-[10px] p-[10px] w-[450px] flex flex-col gap-[10px] ">
<header className="flex justify-between items-center ">
<h1 className="font-bold text-[18px]">یاد داشت های شما</h1>
<Close />

</header>

 <article className=" w-full flex flex-col  ">
      <header className="flex justify-between rounded-tr-[10px] rounded-tl-[10px] p-[10px]  bg-mantle">
        <div className="flex justify-center gap-[10px] items-center">
          <Image
            src={Profile}
            alt="farhan"
            className="rounded-full h-[25px] w-[25px]"
          />
          <Text className="text-[14px] text-subtext-0">یادداشت ۱</Text>
        </div>
        <div className="w-[23px] h-[23px] bg-base rounded-[3px] flex justify-center">
<ExcalamationMark className="h-[13px] w-[13px] text-sapphire self-center " />
</div>
      </header>
      <section className="text-[16px] text-sub-text-1 bg-base w-full  rounded-b-[10px] p-[10px] gap-y-[15px] flex flex-col ">
        <p>
        اینجا متن یادداشت من هست که این سکشن رو سکسی و جذاب کرده اوه شت یسسسس! 
        
    
        </p>
        <section className="flex gap-[10px] justify-end text-[12px]">
        <Button className="bg- text-teal">ویرایش</Button>
        <Button className="bg- text-red">حذف</Button>
        
          
            
      
        </section>
      </section>
    </article>


 <article className=" w-full flex flex-col  ">
      <header className="flex justify-between rounded-tr-[10px] rounded-tl-[10px] p-[10px]  bg-mantle">
        <div className="flex justify-center gap-[10px] items-center">
        
            
            
            
          
          <Text className="text-[14px] text-subtext-0">مطمعنی میخوای حذف کنی؟</Text>
        </div>
        <div className="w-[23px] h-[23px] bg-base rounded-[3px] flex justify-center">
<ExcalamationMark className="h-[13px] w-[13px] text-red self-center " />
</div>
      </header>
      <section className="text-[16px] text-sub-text-1 bg-base w-full  rounded-b-[10px] p-[10px] gap-y-[15px] flex flex-col ">
      
        
        
    
        
        <section className="flex gap-[10px] justify-start text-mantle text-[16px]">
        <Button className="bg- bg-sapphire w-[56px] h-[28px]">آره</Button>
        <Button className="bg- bg-red w-[56px] h-[28px]">نه</Button>
        
          
            
      
        </section>
      </section>
    </article>



</section>
)
}
