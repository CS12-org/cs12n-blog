import axios from '@/lib/axios';

type Course = {
  id: number;
  title: string;
  description: string;
  slug: string;
  top_icon: {
    id: number;
    url: string;
    width: number;
    height: number;
  };
  course_segments: {
    id: string;
    title: string;
    course_segment_links: {
      id: number;
      link_type: 'POST';
      title: string;
      post: { slug: string };
    }[];
  }[];
};

export const getCourse = (slug: string) => axios.get<Course>(`/api/courses/${slug}`);
