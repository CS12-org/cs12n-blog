import Law from '~/assets/images/law.svg';
function LicenceMark() {
  return (
    <section className="bg-base border-surface-0 flex h-[30px] items-start gap-[10px] rounded-[5px] border-[1px] px-[10px] py-[5px] lg:px-[15px]">
      <span className="text-maroon font-OxygenMono text-[12px] lg:text-[16px]">MIT</span>
      <Law className="text-sky h-[14px] w-[14px] lg:h-[20px] lg:w-[20px]" />
    </section>
  );
}

export default LicenceMark;
