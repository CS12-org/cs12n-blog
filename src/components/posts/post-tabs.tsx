import { Tab, TabList, TabPanel, Tabs } from "~/components/react-aria-components";
import CommentSection from "~/components/posts/sections/comment-section";
import Highlights from "~/components/posts/sections/highlight-section";
import ReviewSection from "~/components/posts/sections/review-section";

function PostTabs() {
  return (
    <Tabs className="flex flex-col gap-y-[10px]">
      <TabList className="flex text-subtext-0 rounded-[10px] gap-x-[10px] p-[10px] bg-crust rouned-[10px]">
        <Tab
          id="highlights"
          className="bg-base cursor-pointer selected:bg-sapphire selected:text-crust h-[48px] w-[143px] text-[12px] font-bold flex justify-center items-center rounded-[5px]"
        >
          هایلایت ها
        </Tab>
        <Tab
          id="comments"
          className="bg-base cursor-pointer  selected:bg-sapphire selected:text-crust h-[48px] w-[143px] text-[12px] font-bold flex justify-center items-center rounded-[5px]"
        >
          نظرات
        </Tab>
        <Tab
          id="review"
          className="bg-base cursor-pointer selected:bg-sapphire selected:text-crust h-[48px] w-[143px] text-[12px] font-bold flex justify-center items-center rounded-[5px]"
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
