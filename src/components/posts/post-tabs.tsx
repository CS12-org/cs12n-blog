import { Tab, TabList, TabPanel, Tabs } from '~/components/react-aria-components';
import CommentSection from '~/components/posts/sections/comment-section';
import Highlights from '~/components/posts/sections/highlight-section';
import ReviewSection from '~/components/posts/sections/review-section';

function PostTabs() {
  return (
    <Tabs className="flex flex-col gap-y-[10px]">
      <TabList className="text-subtext-0 bg-crust rouned-[10px] flex gap-x-[10px] rounded-[10px] p-[10px]">
        <Tab
          id="highlights"
          className="bg-base selected:bg-sapphire selected:text-crust flex h-[48px] w-[143px] cursor-pointer items-center justify-center rounded-[5px] text-[12px] font-bold"
        >
          هایلایت ها
        </Tab>
        <Tab
          id="comments"
          className="bg-base selected:bg-sapphire selected:text-crust flex h-[48px] w-[143px] cursor-pointer items-center justify-center rounded-[5px] text-[12px] font-bold"
        >
          نظرات
        </Tab>
        <Tab
          id="review"
          className="bg-base selected:bg-sapphire selected:text-crust flex h-[48px] w-[143px] cursor-pointer items-center justify-center rounded-[5px] text-[12px] font-bold"
        >
          نقد و بررسی
        </Tab>
      </TabList>
      <TabPanel id="highlights">
        <Highlights />
      </TabPanel>
      <TabPanel id="comments">
        <CommentSection />
      </TabPanel>
      <TabPanel id="review">
        <ReviewSection />
      </TabPanel>
    </Tabs>
  );
}

export default PostTabs;
