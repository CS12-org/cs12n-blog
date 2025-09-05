
import ThreeDotts from "~/assets/images/threeDotts.svg";
import LevelSection from "~/components/user-level/level-section" 
import Close from "~/assets/images/close.svg";
function UserLevel() {
  return (
    <section className="flex w-full items-starti flex-col gap-2.5 text-subtext-1">
     <section className="p-[10px] w-full gap-[10px] flex justify-between items-start bg-mantle rounded-[10px]">
        <p className="text-[12px] text-subtext-0 w-full">
   در این بخش شما میبینید که در هر دوره ای که قبول کردید که یاد بگیرید در چه سطحی هستید و کجای دوره ایستاده اید.
        </p>
        <button className="bg-crust w-[23px] h-[23px] rounded-[5px] flex items-center justify-center">
          <Close />
        </button>
      </section>
<section className="px-[15px]">
        <header className="flex justify-between items-center">
          <h1 className="font-extrabold text-3xl mt-2 mb-[10px]">برنامه نویسی</h1>
        </header>
<section className="flex flex-col gap-[25px]"> <LevelSection/>
 <LevelSection/>
</section>
                      
    </section>
    </section>
  );
}

export default UserLevel;
