import { HiBookOpen } from 'react-icons/hi2';
import { twJoin } from 'tailwind-merge';
import { Link } from '~/components/react-aria-components';
import { getCourse } from '~/service/courses';
import Image from 'next/image';

type Props = {
  params: Promise<{
    course: string;
  }>;
};

async function PathPage(props: Props) {
  const { course } = await props.params;
  const courseData = await getCourse(course).then((res) => res.data);

  return (
    <section className="text-text mx-auto flex w-full max-w-3xl flex-col gap-y-4 py-6">
      <div className="flex items-center justify-center">
        <Image
          className="size-24"
          alt={courseData.title}
          src={courseData.top_icon.url}
          width={courseData.top_icon.width}
          height={courseData.top_icon.height}
        />
      </div>
      <h1 className="text-headline-sm lg:text-headline-lg text-center font-extrabold">{courseData.title}</h1>
      <p className="text-overlay-2 text-center">{courseData.description}</p>

      {courseData.course_segments.map((segment) => (
        <section key={segment.id} className="bg-crust flex flex-col rounded-xl">
          <h3 className="text-label-lg border-surface-0 border-b border-solid px-5 py-5">{segment.title}</h3>

          <ul className="py-3">
            {segment.course_segment_links.map((link) => (
              <li key={link.id} className="group">
                <Link
                  href={`/post/${link.post.slug}`}
                  className={twJoin(
                    'text-text text-body-md px-5 py-3 transition',
                    'hover:bg-surface-0 flex w-full items-center gap-3',
                  )}
                >
                  {link.link_type === 'POST' && <HiBookOpen className="size-6 shrink-0" />}
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
