import { GoLaw } from "react-icons/go";

function LicenceMark() {
  return (
    <section className="bg-base py-[5px] px-[10px] lg:px-[15px] border-[1px] border-surface-0 rounded-[5px] flex gap-[10px]">
      <span className="text-maroon text-[12px] lg:text-[16px] font-OxygenMono">
        MIT
      </span>
      <GoLaw className="text-sky lg:h-[20px] lg:w-[20px] w-[14px] h-[14px] " />
    </section>
  );
}

export default LicenceMark;