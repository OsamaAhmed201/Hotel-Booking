import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { axiosInstance, comments_URL } from "../../../../services/Urls";
import CommentItem from "./item";

interface Comment {
  _id: string;
  comment: string;
  createdAt: string;
  user: {
    name?: string;
    userName?: string;
    profileImage?: string;
  };
}

interface CommentsSectionProps {
  Id: string | null;
  refreshTrigger: number;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ Id, refreshTrigger }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(comments_URL.GET_COMMENTS(Id!));
      setComments(res.data.data.roomComments || []);
    } catch (err) {
      console.error("Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Id) {
      fetchComments();
    }
  }, [Id, refreshTrigger]);

  return (
    <Box mt={6}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Comments
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : comments.length === 0 ? (
        <Typography>No comments yet.</Typography>
      ) : (
       comments.map((comment: any, index: number) => (
          <CommentItem
            key={index}
            username={comment.user?.name || "Anonymous"}
            content={comment.comment}
            createdAt={comment.createdAt}
            profileImage={comment.user?.profileImage || ""}
          />
        ))
      )}
    </Box>
  );
};

export default CommentsSection;
