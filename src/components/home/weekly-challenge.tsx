import Image from 'next/image';
import { twJoin } from 'tailwind-merge';
import RunnintPerson from '~/assets/images/running-with-obstacles.svg';
import Oclock from '~/assets/images/time-oclock.svg';
import { Link } from '~/components/react-aria-components';

const TAGS = ['چالش', 'گیت', 'چالش_هفتگی'];
const COLORS = ['text-yellow', 'text-peach', 'text-lavender'];

function WeeklyChallenge() {
  return (
    <article className="bg-crust rounded-xl py-5">
      <header className="mb-2.5 flex items-center gap-1 px-5 [&>*]:shrink-0">
        <h3 className="text-body-sm text-subtext-0">چالش هفتگی</h3>
        <RunnintPerson className="text-yellow h-[23px] w-[23px]" />
        <Oclock className="text-lavender mr-auto h-[20px] w-[20px]" />
      </header>

      <main className="px-6 lg:px-10">
        <Link href="#" className="w-full">
          <Image
            alt="weekly challenge"
            src="/cs12-challenge.png"
            className="mb-4.5 w-full rounded-2xl"
            width={800}
            height={400}
          />
        </Link>

        <div className="mb-4.5 flex items-center justify-between">
          <h4 className="text-label-sm lg:text-title-xs">
            <span className="text-red hidden lg:inline">توجه :</span>
            <span> چالش هفتگی شروع شد</span>
          </h4>

          <p className="text-sky text-label-sm lg:text-title-xs">۷ روز مانده به اتمام چالش</p>
        </div>

        <div
          className={twJoin(
            'bg-base rounded-xl px-4 py-3',
            'flex items-start gap-2.5 border',
            'border-surface-0 border-solid',
          )}
        >
          <Image
            width={46}
            height={46}
            src="/cs12challengelogo.png"
            alt="weekly challenge logo"
            className="size-11.5 rounded-md"
          />

          <div>
            <Link href="#" className="block">
              <h2 className="text-title-sm mb-1">با ما در هفته اول چالش برنامه نویسی با گیت رو شروع کنید.</h2>
            </Link>

            <p className="text-subtext-1 text-body-sm mb-2">
              سه تا مقاله رو میخونی یه ریپو میاری بالا و از بست پرکتیس های توی مقاله استفاده میکنی و بومممم 💥 هم گیت رو
              یاد گرفتی هم یه جایزه میبری!
            </p>

            <ul className="text-body-xs flex items-start justify-start gap-2.5">
              {TAGS.map((tag, index) => (
                <li key={tag} className={COLORS[index % COLORS.length]}>
                  <Link href="#" className="hover:underline">
                    #{tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <footer className="mt-4 px-10">
        <p className="text-title-sm">خوب کد بزنی!</p>
      </footer>
    </article>
  );
}

export default WeeklyChallenge;
