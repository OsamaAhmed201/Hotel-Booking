export interface ApiResponse {
  success: boolean
  message: string
  data: {
    roomComments: RoomComment[]
    totalCount: number
  }
}

export interface RoomComment {
  _id: string
  room: {
    
    _id: string
    roomNumber: string
  }
  user: {
    _id: string
    userName: string
    profileImage: string
  }
  comment: string
  createdAt: string
  updatedAt: string
}

export interface CommentItemProps {
  comment: RoomComment
  isReply?: boolean
  onLike: (commentId: string) => void
  onDislike: (commentId: string) => void
  onReply: (commentId: string) => void
}
