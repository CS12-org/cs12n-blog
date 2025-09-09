import { HiBookOpen } from "react-icons/hi2";
import { twJoin } from "tailwind-merge";
import { Link } from "~/components/react-aria-components";
import { getCourse } from "~/service/courses";
import Image from "next/image";

type Props = {
  params: Promise<{
    course: string;
  }>;
};

async function PathPage(props: Props) {
  const { course } = await props.params;
  const courseData = await getCourse(course).then((res) => res.data);

  return (
    <section className="text-text w-full py-6 flex flex-col gap-y-4 max-w-3xl mx-auto">
      <div className="flex items-center justify-center">
        <Image
          className="size-24"
          alt={courseData.title}
          src={courseData.top_icon.url}
          width={courseData.top_icon.width}
          height={courseData.top_icon.height}
        />
      </div>
      <h1 className="text-headline-sm lg:text-headline-lg font-extrabold text-center">
        {courseData.title}
      </h1>
      <p className="text-overlay-2 text-center">{courseData.description}</p>

      {courseData.course_segments.map((segment) => (
        <section key={segment.id} className="bg-crust rounded-xl flex flex-col">
          <h3 className="px-5 py-5 text-label-lg border-b border-solid border-surface-0">
            {segment.title}
          </h3>

          <ul className="py-3">
            {segment.course_segment_links.map((link) => (
              <li key={link.id} className="group">
                <Link
                  href={`/post/${link.post.slug}`}
                  className={twJoin(
                    "text-text text-body-md py-3 px-5 transition",
                    "w-full flex items-center gap-3 hover:bg-surface-0",
                  )}
                >
                  {link.link_type === "POST" && (
                    <HiBookOpen className="size-6 shrink-0" />
                  )}
                  <span>{link.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </section>
  );
}

export default PathPage;
