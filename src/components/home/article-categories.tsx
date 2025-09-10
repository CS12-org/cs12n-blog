import ResponsiveSideBar from '../responsive-side-bar';
import { getRoadmaps } from '~/service/roadmaps';

async function ArticleCategories() {
  const roadmaps = await getRoadmaps().then((res) => res.data);

  return (
    <ResponsiveSideBar
      title="مطالب سایت"
      groups={roadmaps.map((map) => ({
        slug: map.slug,
        title: map.title,
        icon: map.top_icon,
      }))}
    />
  );
}

export default ArticleCategories;
