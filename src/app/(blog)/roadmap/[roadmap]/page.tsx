import { getRoadmap } from "~/service/roadmaps";
import Image from "next/image";
import { Link } from "~/components/react-aria-components";
import { twJoin } from "tailwind-merge";

type Props = {
  params: Promise<{
    roadmap: string;
  }>;
};

async function PathPage(props: Props) {
  const { roadmap } = await props.params;

  const roadmapData = await getRoadmap(roadmap).then((res) => res.data);

  return (
    <section className="text-text w-full h-auto py-6 flex flex-col items-center gap-y-4 text-center">
      <div className="flex items-center justify-center">
        <Image
          className="size-24"
          alt={roadmapData.title}
          src={roadmapData.top_icon.url}
          width={roadmapData.top_icon.width}
          height={roadmapData.top_icon.height}
        />
      </div>
      <h1 className="text-headline-sm lg:text-headline-lg font-extrabold">
        {roadmapData.title}
      </h1>
      <p className="text-overlay-2 max-w-prose">{roadmapData.description}</p>

      <div className="flex items-center w-full my-4">
        <div className="flex-1 h-0.5 bg-text" />
        <span className="px-3 text-text text-title-lg">مسیرت رو انتخاب کن</span>
        <div className="flex-1 h-0.5 bg-text" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full items-start">
        {roadmapData.courses.map((item) => (
          <article
            key={item.id}
            className="bg-crust rounded-xl px-8 pt-10 pb-8 text-start flex flex-col border border-solid border-surface-0"
          >
            <Image
              alt={item.title}
              src={item.top_icon.url}
              width={item.top_icon.width}
              height={item.top_icon.height}
              className="size-38 self-center mb-6"
            />

            <p className="flex items-center justify-between w-full text-overlay-2 text-body-sm mb-4">
              <span>مسیر</span>
              <span>{item.course_segments.count} دوره</span>
            </p>

            <h3 className="text-headline-sm font-bold mb-3">{item.title}</h3>

            <p className="text-overlay-1 text-body-md mb-4">
              {item.description}
            </p>

            <Link
              href={`/roadmap/${roadmap}/${item.slug}`}
              className={twJoin(
                "self-start px-5 py-2 bg-sapphire text-base mt-auto",
                "rounded-md hover:brightness-110 active:brightness-100",
                "transition",
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
