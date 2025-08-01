"use client";

import { BiMessageAltDetail } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import { RiUser3Fill } from "react-icons/ri";
import { TbNotes } from "react-icons/tb";
import ResponsiveSideBar from "../ResponsiveSideBar";

const groups = [
  {
    slug: "#",
    icon: RiUser3Fill,
    title: "اطلاعات اولیه کاربر",
  },
  {
    slug: "#",
    icon: CiBookmark,
    title: "پست های سیو شده",
  },
  {
    slug: "#",
    icon: TbNotes,
    title: "یادداشت ها و هایلایت ها",
  },
  {
    slug: "#",
    icon: BiMessageAltDetail,
    title: "نظرات و پرسش و پاسخ",
  },
];

function UserPanelList() {
  return <ResponsiveSideBar title="پنل کاربری" groups={groups} />;
}

export default UserPanelList;
