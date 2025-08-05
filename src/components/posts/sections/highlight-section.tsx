import HighlightMessege from "../comment-messages/highlight-message";

function Highlights() {
  return (
    <section className="text-subtext-0 flex flex-col gap-[25px]">
      <header className="bg-crust rounded-[10px]  w-full p-[20px] font-extrabold text-[20px]">
        هایلایت ها و نوت ها{" "}
      </header>

      <HighlightMessege />
    </section>
  );
}

export default Highlights;