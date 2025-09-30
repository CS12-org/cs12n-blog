import { FaRegClock } from 'react-icons/fa6';
import Check from '@/assets/images/check.svg';
import Dottcircle from '@/assets/images/dottcircle.svg';
import { TbApi } from 'react-icons/tb';

enum FeatureStatus {
  NOT_YET,
  PENDING,
  COMPLETED,
  API,
}

const FeatureStatusIcon = {
  [FeatureStatus.COMPLETED]: <Check className="ml-[-1px]" />,
  [FeatureStatus.PENDING]: <FaRegClock className="text-yellow h-5.5 w-5.5" />,
  [FeatureStatus.NOT_YET]: <Dottcircle className="ml-[-3px]" />,
  [FeatureStatus.API]: <TbApi className="text-maroon h-5.5 w-5.5" />,
} as const;

const pageFeatures = [
  {
    title: 'خانه',
    status: FeatureStatus.API,
  },
  {
    title: 'درباره ما : لندینگ پیج CS12',
    status: FeatureStatus.NOT_YET,
  },
  {
    title: 'یوزر پروفایل',
    status: FeatureStatus.PENDING,
  },
  {
    title: 'یوزر پنل',
    status: FeatureStatus.PENDING,
  },
  {
    title: 'پست پیج',
    status: FeatureStatus.PENDING,
  },
  {
    title: 'ارور پیج',
    status: FeatureStatus.PENDING,
  },
  {
    title: 'سکشن چالش های هفتگی : در ورژن بعدی',
    status: FeatureStatus.NOT_YET,
  },
  {
    title: 'تِرَک پیج',
    status: FeatureStatus.PENDING,
  },
  {
    title: 'کتگوری پیج',
    status: FeatureStatus.PENDING,
  },
];

const coreFeatures = [
  {
    title: 'هایلایت و یادداشت پرایوت',
    status: FeatureStatus.PENDING,
    desc: 'در هر پست شما میتونید روی هر سکشنی که دوست دارید متن رو هایلایت کنید و سپس یک یادداشت شخصی برای خودتون بگذارید',
  },
  {
    title: 'امکان به اشتراک گذاری هایلایت ها و یادداشت',
    status: FeatureStatus.PENDING,
    desc: 'هر بار که احساس کردید هایلایت هاتون خفنه میتونید با یه کامیت اون یادداشت و هایلایت رو به اشتراک بگذارید تا همه بتونن ازش استفاده کنن و حتی نقد و بررسیش کنن بهش لایک و دیسلایک بدن و خلاصه آره باعث میشه که صفحه غنی تر از صرفا محتوایی بشه که نویسنده نوشته',
  },
  {
    title: 'نقد و بررسی',
    status: FeatureStatus.PENDING,
    desc: 'تصمیم گرفتیم برای بهتر کردن فضای فنی کامیونیتی یک سکشن به اسم نقد و بررسی در نظر بگیریم که افراد بتونند درحقیقت زیر هر پست یه پست بنویسن که پست رو نقد و بررسی کنه عکس داشته باشه پاورقی داشته باشه و حتی بشه روش کامنت گذاشت و بحث کرد و حتی بشه ریتش کرد.',
  },
  {
    title: 'روتین سازی + تِرَک کردن آموزش',
    status: FeatureStatus.PENDING,
    desc: 'وقتی قراره یه چیزی رو یاد بگیریم بهتره که سشن های یادگیری اینجوری باشند که بشه به شکل یه روتین قابل انجام بهشون نگاه کرد و در نهایت بتونیم وضعیت چیزایی که یادگرفتیم رو بدونیم و از همه مهم تر مدام پروژه بزنیم.',
  },
  {
    title: 'امکان سلکت و دی سلکت کردن کورس های آموزشی ',
    status: FeatureStatus.PENDING,
    desc: 'شما میتونید مثلا بخش programming رو بردارید و مثلا فقط زبان c از توش یاد بگیرید و کاری به باقیه کورس ها نداشته باشید اینجوری هم ترک کردن شما راحت تره و هم این که بهتر میتونی روی یه مطلب تمرکز کنی',
  },
];

export const metadata = {
  title: 'CS12 – Feature Track Page',
  description:
    'Track the development stages and new features of the CS12 web application, designed to empower developers and learners through deep foundational tools.',
  robots: 'index, follow',
};

function Features() {
  return (
    <main className="text-body-xs lg:text-body-md flex flex-col gap-y-3.5">
      <section className="bg-crust flex h-auto w-full flex-col content-center gap-y-2.5 rounded-xl px-7.5 py-4 text-white">
        <h2 className="text-headline-sm lg:text-headline-lg">داستان این صفحه چیه؟</h2>
        <p className="text-overlay-2">
          این صفحه ساخته شده که شما بتونید از استیج پروژه وب اپ و حتی فیچر ها و برنامه های آینده ما خبر دار بشید و
          ببینید چه فیچر هایی زده شده و چه فیچر هایی قراره زده بشه و خلاصه چه اتفاقی داره میوفته .
        </p>
      </section>
      <section className="bg-crust flex h-auto w-full flex-col content-center gap-y-2.5 rounded-xl px-7.5 py-4 text-white">
        <h2 className="text-headline-sm lg:text-headline-lg">صفحات</h2>
        <p className="text-overlay-2">
          این وب اپ صفحات زیادی نداره اما برای هر کدوم فیچر های خاصی رو در نظر داریم و به همین خاطر هست که ممکنه برای
          پیاده سازی اکثر این فیچرا کمی زمان بیشتری صرف کنیم.
        </p>
      </section>
      <ul className="bg-crust flex h-auto w-full flex-col rounded-xl py-4">
        {pageFeatures.map((item) => (
          <li
            key={item.title}
            className="bg-mantle border-base flex h-auto content-center items-center justify-between border-b-[1px] px-7.5 py-2"
          >
            <p>{item.title}</p>
            {FeatureStatusIcon[item.status]}
          </li>
        ))}
      </ul>
      <section className="bg-crust flex h-auto w-full flex-col content-center gap-y-2.5 rounded-xl px-7.5 py-4 text-white">
        <h2 className="text-headline-sm lg:text-headline-lg">فیچر ها</h2>
        <p className="text-overlay-2">
          ما سعی کردیم که توی سایت یه شبکه ای از هایلایت ها و صفحاتی که یوزر ها کامل میکنند بسازیم برای این قضیه فیچر
          های زیر رو در نظر گرفتیم.
        </p>
      </section>

      <ul className="bg-crust flex h-auto w-full flex-col rounded-xl py-4 font-bold">
        {coreFeatures.map((item) => (
          <li key={item.title} className="bg-mantle border-base h-auto border-b-[1px] px-7.5 py-2">
            <div className="flex content-center items-center justify-between">
              <p>{item.title}</p>
              {FeatureStatusIcon[item.status]}
            </div>
            {item.desc && <p className="text-overlay-2 pt-3 pl-5 font-normal">{item.desc}</p>}
          </li>
        ))}
      </ul>
    </main>
  );
}
export default Features;
