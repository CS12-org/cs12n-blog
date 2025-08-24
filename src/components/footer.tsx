import Home from "~/assets/images/home.svg"
import Telephone from "~/assets/images/telephone.svg"
import Help from "~/assets/images/help.svg"
import About from "~/assets/images/aboutus.svg"

export default function Footer(){
    return(
        <section className="bg-crust lg:hidden justify-between flex rounded-t-[11px] px-[50px] pt-[20px] pb-[10px] gap-[20px] text-overlay-1 text-[12px]">
        <button className="flex flex-col items-center gap-[5px]"><About className="w-[22px] h-[22px]" /> درباره ما</button>    
         <button className="flex flex-col items-center gap-[5px]" >  <Home className="w-[22px] h-[22px]" /> خونه</button> 
           <button  className="flex flex-col items-center gap-[5px]"><Telephone className="w-[22px] h-[22px]" /> تماس با ما</button> 
          <button  className="flex flex-col items-center gap-[5px]"> <Help className="w-[22px] h-[22px]" /> کمک!</button> 
        </section>
    )
}
