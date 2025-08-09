import { SiC } from "react-icons/si";
import { HiBookOpen } from "react-icons/hi2";
import { twJoin } from "tailwind-merge";
import { Link } from "~/components/react-aria-components";

function PathPage() {
  return (
    <section className="text-text w-full py-6 flex flex-col gap-y-4 max-w-3xl mx-auto">
      <div className="flex items-center justify-center">
        <SiC className="h-14 w-14" />
      </div>
      <h1 className="text-headline-sm lg:text-headline-lg font-extrabold text-center">
        مسیر یادگیری C
      </h1>
      <p className="text-overlay-2 text-center">
        مسیر تو از همین‌جا شروع می‌شود! یک معرفی عملی به تمام ابزارها و مفاهیم
        ضروری که برای ساخت پروژه‌های واقعی علوم کامپیوتر نیاز دارید. در این مسیر
        یاد می‌گیرید متخصصان علوم کامپیوتر دقیقا چه کار می‌کنند و با مبانی نظری
        و عملی آشنا می‌شوید.
      </p>

      <section className="bg-crust rounded-xl flex flex-col">
        <h3 className="px-5 py-5 text-label-lg border-b border-solid border-surface-0">
          شروع و معرفی
        </h3>

        <ul className="py-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <li key={index} className="group">
              <Link
                href="#"
                className={twJoin(
                  "text-text text-body-md py-3 px-5 transition",
                  "block w-full flex items-center gap-3 hover:bg-surface-0"
                )}
              >
                <HiBookOpen className="size-6 shrink-0" />
                <span>عنوان دوره {index + 1}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-crust rounded-xl flex flex-col">
        <h3 className="px-5 py-5 text-label-lg border-b border-solid border-surface-0">
          مباحث پیشرفته و کار با مموری
        </h3>

        <ul className="py-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <li key={index} className="group">
              <Link
                href="#"
                className={twJoin(
                  "text-text text-body-md py-3 px-5 transition",
                  "block w-full flex items-center gap-3 hover:bg-surface-0"
                )}
              >
                <HiBookOpen className="size-6 shrink-0" />
                <span>کار با توابع و پوینتر ها {index + 1}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

export default PathPage;
