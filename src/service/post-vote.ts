import axios from '@/lib/axios';

export enum VoteEnum {
  UPVOTE = 'upvote',
  DOWNVOTE = 'downvote',
}
export type PostVoteReq = {
  commentId: string;
  voteType: VoteEnum;
};
export type PostVoteRes = {
  id: string;
  content: string;
  quotedText: string | null;
  quotedStartIndex: number;
  quotedEndIndex: number;
  upvotes: number;
  downvotes: number;
  netScore: number;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    username: string;
    profile: {
      user: string;
      fullName: string;
      bio: string | null;
      avatarUrl: string | null;
      coverUrl: string | null;
      website: string | null;
    };
  };
  userVote: { voteType: VoteEnum } | null;
};
export const postVote = (body: PostVoteReq) => axios.post<PostVoteRes>('/api/comments/vote', body);
