import Link from 'next/link';
import ThreeDotPopover from './three-dots-popover';

export default function LevelSection() {
  const tabs = [
    { id: 1, label: 'برنامه‌نویسی', href: '/programming' },
    { id: 2, label: 'زبان سی', href: '/c' },
  ];
  const colors = {
    برنامه‌نویسی: 'text-sapphire',
    'زبان سی': 'text-maroon',
  };
  return (
    <section className="text-text flex w-full flex-col text-[12px]">
      <header className="bg-crust flex items-center justify-between rounded-t-[10px] px-[10px] py-[12px]">
        <ul className="flex gap-2 text-[14px] font-bold">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`bg-base rounded-[6px] px-[15px] ${colors[tab.label as keyof typeof colors] || 'text-sapphire'}`}
            >
              <Link href={tab.href}>{tab.label}</Link>
            </li>
          ))}
        </ul>

        <ThreeDotPopover />
      </header>
      <section className="rounded-b-[10px] bg-[#101122] p-[10px] pt-[15px]">
        <p className="mb-[10px]">شما تا قسمت ۱۲ از دوره برنامه نویسی و بخش زبان سی رو جلو رفتید.</p>
        <p>مباحثی که باید بلد باشید:</p>
        <ul className="list-inside list-disc leading-[12px]">
          <li>متغیر ها و دیتا تایپ ها در زبان سی</li>
        </ul>
      </section>
    </section>
  );
}
