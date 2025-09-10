import HighlightMessege from '../comment-messages/highlight-message';

function Highlights() {
  return (
    <section className="text-subtext-0 flex flex-col gap-[25px]">
      <header className="bg-crust flex w-full justify-center rounded-[10px] p-[20px] text-[20px] font-extrabold lg:justify-start">
        هایلایت ها و نوت ها{' '}
      </header>

      <HighlightMessege />
    </section>
  );
}

export default Highlights;
