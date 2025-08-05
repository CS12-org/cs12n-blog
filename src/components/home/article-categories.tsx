'use client';

import { FaFileCode, FaMicrochip } from "react-icons/fa6";
import ResponsiveSideBar from "../responsive-side-bar";

const groups = [
  {
    slug: "#coding",
    icon: FaFileCode,
    title: "برنامه نویسی",
  },
  {
    slug: "#",
    icon: FaMicrochip,
    title: "معماری کامپیوتر",
  },
];

function ArticleCategories() {
  return <ResponsiveSideBar title="مطالب سایت" groups={groups} />;
}

export default ArticleCategories;
