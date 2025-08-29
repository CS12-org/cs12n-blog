import axios from "~/lib/axios";

type Course = {
  id: number;
  slug: string;
  title: string;
  description: string;
  course_segments: { count: number };
  top_icon: { url: string; width: number; height: number; id: number };
};

type Roadmap = {
  id: number;
  description: string;
  title: string;
  slug: string;
  top_icon: {
    id: number;
    url: string;
    width: number;
    height: number;
  };
};

export const getRoadmaps = () =>
  axios.get<Omit<Roadmap, "description">[]>("/api/roadmaps");

type GetRoadmapResult = Roadmap & { courses: Course[] };

export const getRoadmap = (slug: string) =>
  axios.get<GetRoadmapResult>("/api/roadmaps/" + slug);
