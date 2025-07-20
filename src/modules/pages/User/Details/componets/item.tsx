import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

interface CommentItemProps {
  username: string;
  content: string;
  createdAt: string;
  profileImage: string;
}

const CommentItem: React.FC<CommentItemProps> = ({
  username,
  content,
  createdAt,
  profileImage,
}) => {
  return (
    <Box display="flex" gap={2} alignItems="flex-start" mb={2}>
      <Avatar src={profileImage} alt={username} />
      <Box>
        <Typography fontWeight="bold">{username}</Typography>
        <Typography variant="body2" sx={{ mt: 0.5 }}>
          {content}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(createdAt).toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default CommentItem;
