import Button from "~/components/button";
import { SiProcesswire, SiC } from "react-icons/si";

function PathPage() {
  return (
    <section className="text-text w-full h-auto py-6 flex flex-col items-center gap-y-4 text-center">
      <div className="flex items-center justify-center">
        <SiProcesswire className="h-14 w-14" />
      </div>
      <h1 className="text-headline-sm lg:text-headline-lg font-extrabold">
        همه مسیر ها
      </h1>
      <p className="text-overlay-2 max-w-prose">
        مسیر تو از همین‌جا شروع می‌شود! یک معرفی عملی به تمام ابزارها و مفاهیم
        ضروری که برای ساخت پروژه‌های واقعی علوم کامپیوتر نیاز دارید. در این مسیر
        یاد می‌گیرید متخصصان علوم کامپیوتر دقیقا چه کار می‌کنند و با مبانی نظری
        و عملی آشنا می‌شوید.
      </p>

      <div className="flex items-center w-full my-4">
        <div className="flex-1 h-0.5 bg-text" />
        <span className="px-3 text-text text-title-lg">مسیرت رو انتخاب کن</span>
        <div className="flex-1 h-0.5 bg-text" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
        {Array.from({ length: 3 }).map((_, index) => (
          <article
            key={index}
            className="bg-crust rounded-xl px-6 pt-8 pb-6 text-start flex flex-col"
          >
            <SiC className="size-14 self-center text-sapphire mb-6" />

            <p className="flex items-center justify-between w-full text-overlay-2 text-body-sm mb-4">
              <span>مسیر</span>
              <span>5 دوره</span>
            </p>

            <h3 className="text-headline-sm font-bold mb-3">آموزش مقدماتی C</h3>

            <p className="text-overlay-1 text-body-sm mb-4">
              {index != 2 && "توضیح کوتاه درباره این مسیر و مهارت‌هایی که یاد می‌گیرید."}
              {index === 2 && "توضیح کوتاه درباره این مسیر و مهارت‌هایی که یاد می‌گیرید. توضیح کوتاه درباره این مسیر و مهارت‌هایی که یاد می‌گیرید. توضیح کوتاه درباره این مسیر و مهارت‌هایی که یاد می‌گیرید."}
            </p>

            <Button variant="none" className="self-start px-5 py-2 bg-sapphire text-base mt-auto">
              شروع مسیر
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PathPage;
