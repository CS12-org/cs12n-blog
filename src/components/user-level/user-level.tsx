import Close from '@/assets/images/close.svg';
import LevelSection from '@/components/user-level/level-section';
function UserLevel() {
  return (
    <section className="items-starti text-subtext-1 flex w-full flex-col gap-2.5">
      <section className="bg-mantle flex w-full items-start justify-between gap-[10px] rounded-[10px] p-[10px]">
        <p className="text-subtext-0 w-full text-[12px]">
          در این بخش شما میبینید که در هر دوره ای که قبول کردید که یاد بگیرید در چه سطحی هستید و کجای دوره ایستاده اید.
        </p>
        <button className="bg-crust flex h-[23px] w-[23px] items-center justify-center rounded-[5px]">
          <Close />
        </button>
      </section>
      <section className="px-[15px]">
        <header className="flex items-center justify-between">
          <h1 className="mt-2 mb-[10px] text-3xl font-extrabold">برنامه نویسی</h1>
        </header>
        <section className="flex flex-col gap-[25px]">
          {' '}
          <LevelSection />
          <LevelSection />
        </section>
      </section>
    </section>
  );
}

export default UserLevel;
