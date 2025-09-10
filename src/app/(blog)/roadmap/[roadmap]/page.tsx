import { getRoadmap } from '~/service/roadmaps';
import Image from 'next/image';
import { Link } from '~/components/react-aria-components';
import { twJoin } from 'tailwind-merge';

type Props = {
  params: Promise<{
    roadmap: string;
  }>;
};

async function PathPage(props: Props) {
  const { roadmap } = await props.params;

  const roadmapData = await getRoadmap(roadmap).then((res) => res.data);

  return (
    <section className="text-text flex h-auto w-full flex-col items-center gap-y-4 py-6 text-center">
      <div className="flex items-center justify-center">
        <Image
          className="size-24"
          alt={roadmapData.title}
          src={roadmapData.top_icon.url}
          width={roadmapData.top_icon.width}
          height={roadmapData.top_icon.height}
        />
      </div>
      <h1 className="text-headline-sm lg:text-headline-lg font-extrabold">{roadmapData.title}</h1>
      <p className="text-overlay-2 max-w-prose">{roadmapData.description}</p>

      <div className="my-4 flex w-full items-center">
        <div className="bg-text h-0.5 flex-1" />
        <span className="text-text text-title-lg px-3">مسیرت رو انتخاب کن</span>
        <div className="bg-text h-0.5 flex-1" />
      </div>

      <div className="grid w-full grid-cols-1 items-start gap-4 lg:grid-cols-2">
        {roadmapData.courses.map((item) => (
          <article
            key={item.id}
            className="bg-crust border-surface-0 flex flex-col rounded-xl border border-solid px-8 pt-10 pb-8 text-start"
          >
            <Image
              alt={item.title}
              src={item.top_icon.url}
              width={item.top_icon.width}
              height={item.top_icon.height}
              className="mb-6 size-38 self-center"
            />

            <p className="text-overlay-2 text-body-sm mb-4 flex w-full items-center justify-between">
              <span>مسیر</span>
              <span>{item.course_segments.count} دوره</span>
            </p>

            <h3 className="text-headline-sm mb-3 font-bold">{item.title}</h3>

            <p className="text-overlay-1 text-body-md mb-4">{item.description}</p>

            <Link
              href={`/roadmap/${roadmap}/${item.slug}`}
              className={twJoin(
                'bg-sapphire mt-auto self-start px-5 py-2 text-base',
                'rounded-md hover:brightness-110 active:brightness-100',
                'transition',
              )}
            >
              شروع مسیر
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PathPage;
