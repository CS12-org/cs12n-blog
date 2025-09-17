"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useSavePost } from "~/hooks/use-save-unsave";

interface SaveButtonProps {
  postId: string;
  isSavedByCurrentUser: boolean;
}

export default function SaveButton({ postId, isSavedByCurrentUser }: SaveButtonProps) {
  const { status } = useSession();
  const [isSaved, setIsSaved] = useState(isSavedByCurrentUser);
  const [loading, setLoading] = useState(false);

  const { saveMutation, unsaveMutation } = useSavePost(postId);

  const handleClick = async () => {
    if (status === "unauthenticated") {
      signIn();
      return;
    }

    setLoading(true);
    try {
      if (isSaved) {
        await unsaveMutation.mutateAsync();
        setIsSaved(false);
      } else {
        await saveMutation.mutateAsync();
        setIsSaved(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 29 29"
        fill={isSaved ? "#8AADF4" : "none"}
        stroke={isSaved ? "#8AADF4" : "currentColor"}
        strokeWidth="2"
        strokeLinejoin="round"
        className="w-[27px] h-[27px]"
      >
        <path d="M19.671 4.98535C20.8282 4.98535 21.7663 5.92342 21.7663 7.08059V21.8034C21.7663 23.4122 20.0283 24.4208 18.6315 23.6226L15.4725 21.8174C14.8283 21.4494 14.0376 21.4494 13.3934 21.8174L10.2344 23.6226C8.83758 24.4208 7.09961 23.4122 7.09961 21.8034V7.08059C7.09961 5.92342 8.03768 4.98535 9.19485 4.98535H19.671Z" />
      </svg>
    </button>
  );
}
