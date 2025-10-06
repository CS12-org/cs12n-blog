import axios from '~/lib/axios';
import { FeaturedImage } from '~/service/posts';

type PostQueryParams = {};
type GetPostBySlugReq = {
  postId: string;
  params?: PostQueryParams;
};

type ContentNode = {
  type: string;
  attrs?: {
    dir: string | null;
    textAlign: string | null;
  };
  content?: Array<
    | {
        type: string;
        text?: string;
      }
    | ContentNode
  >;
};

type PostContent = {
  id: string;
  text: {
    type: string;
    content: ContentNode[];
  };
  post: string;
};

type UserProfile = {
  user: string;
  fullName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  coverUrl: string | null;
  website: string | null;
};

type User = {
  id: string;
  email: string;
  username: string;
  isActive: boolean;
  isVerified: boolean;
  lastVerificationEmailSentAt: string;
  profile: UserProfile;
  postCount: number;
};

type Tag = {
  id: string;
  createdAt: string;
  name: string;
  slug: string;
};

export type Comment = {
  id: string;
  content: string;
  quotedText: string;
  quotedStartIndex: number;
  quotedEndIndex: number;
  upvotes: number;
  downvotes: number;
  netScore: number;
  isPinned: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    username: string;
    profile: {
      fullName: string;
      avatarUrl: string;
    };
  };
  parentId: string;
  replies: string[];
  userVote: Record<string, any>;
};

type GetPostBySlugRes = {
  createdAt: string;
  featuredImage: FeaturedImage | null;
  slideImages: string[] | null;
  title: string;
  slug: string;
  excerpt: string;
  content: PostContent;
  contentText: string;
  status: string;
  saveCount: number;
  viewCount: number;
  publishedAt: string | null;
  user: User;
  ratingCount: number;
  ratingSum: number;
  averageRating: number;
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string[] | null;
  id: string;
  claps: string[];
  tags: Tag[];
  comments: Comment[];
};
export const getPostBySlug = async ({ postId, params }: GetPostBySlugReq): Promise<GetPostBySlugRes> => {
  try {
    const response = await axios.get<GetPostBySlugRes>(`/posts/${postId}`, {
      params,
    });
    return response.data;
  } catch (err: unknown) {
    console.log(err);
    throw new Error(`Failed to fetch post with slug ${postId}`);
  }
};
