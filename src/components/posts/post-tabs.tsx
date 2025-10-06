import { Tab, TabList, TabPanel, Tabs } from '@/components/react-aria-components';
import CommentSection from '@/components/posts/sections/comment-section';
import Highlights from '@/components/posts/sections/highlight-section';
import ReviewSection from '@/components/posts/sections/review-section';
import { postTabItems } from '@/app/(blog)/post/[slug]/page';

type postTabsProps = { postTabsData: postTabItems[] };
function PostTabs({ postTabsData }: postTabsProps) {
  return (
    <Tabs className="flex flex-col gap-y-[10px]">
      <TabList className="text-subtext-0 bg-crust flex gap-x-[10px] rounded-[10px] p-[10px]">
        {postTabsData?.map((tab) => (
          <Tab
            key={tab?.id}
            id={tab?.id}
            className="bg-base selected:bg-sapphire selected:text-crust flex h-[48px] w-[143px] cursor-pointer items-center justify-center rounded-[5px] text-[12px] font-bold"
          >
            {tab?.title}
          </Tab>
        ))}
      </TabList>
      {postTabsData?.map((tab) => (
        <TabPanel key={tab?.id} id={tab?.id}>
          {tab?.component}
        </TabPanel>
      ))}
    </Tabs>
  );
}

export default PostTabs;
