import ThreeDotts from "~/assets/images/threeDotts.svg";
import Link from 'next/link'
import ThreeDotPopover from "./three-dots-popover";



export default function LevelSection(){
const tabs = [
  { id:1 , label: "برنامه‌نویسی", href: "/programming" },
 ]
const colors = {
  "برنامه‌نویسی": "text-sapphire",
}
    return(
        <section className="  text-text text-[12px]  flex flex-col w-full ">
      <header className="bg-crust rounded-t-[10px] py-[12px] px-[10px] flex justify-between items-center">
   
 

<ul className="font-bold text-[14px] flex gap-2 ">
  {tabs.map(tab => (
    <li
      key={tab.id}
      className={`px-[15px]  bg-base rounded-[6px] ${colors[tab.label] || " text-sapphire"}`}
    >
      <Link href={tab.href}>{tab.label}</Link>
    </li>
  ))}
</ul>

  <ThreeDotPopover />

      </header>
<section className="bg-[#101122] p-[10px] pt-[15px] rounded-b-[10px]">
<p className="mb-[10px]" >
شما تا قسمت ۱۲ از دوره برنامه نویسی و بخش زبان سی رو جلو رفتید.
</p>
<p>مباحثی که باید بلد باشید:</p>
<ul className="leading-[12px] list-disc list-inside">
<li>متغیر ها و دیتا تایپ ها در زبان سی</li>

</ul>

</section>


        </section>
    )
}
