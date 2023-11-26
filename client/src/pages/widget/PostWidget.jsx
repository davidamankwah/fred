import {ChatBubbleOutlineOutlined,FavoriteBorderOutlined,FavoriteOutlined,} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Follower from "../../components/Follower";
import StyledWrapper from "../../components/Wrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";
  
  const PostWidget = ({
    postId,
    postUserId,
    name,
    text,
    picturePath,
    profileImage,
    likes,
    comments,
  }) => {
    // State to manage the display of comments
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]); // Checking if the logged-in user has liked the post
    const likeCount = Object.keys(likes).length; // Counting the number of likes
  
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
  
    // Function to handle liking or unliking a post
    const patchLike = async () => {
      // Sending a PATCH request to update like status
      const response = await fetch(`http://localhost:4000/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
           Permitted: `Bearer ${token}`, // Including the bearer token for authentication
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      // Updating the Redux state with the updated post
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    };
  
    return (
      <StyledWrapper m="2rem 0">
        {/* Displaying the user who made the post */}
        <Follower
          followerId={postUserId}
          name={name}
          profileImage={profileImage}
        />
        {/* Displaying the post text */}
        <Typography color={main} sx={{ mt: "1rem" }}>
          {text}
        </Typography>
        {/* Displaying the post image if available */}
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:4000/assets/${picturePath}`}
          />
        )}
        {/* Section for like and comment */}
        <FlexBetween mt="0.25rem">
          {/* Section for like and comment counts */}
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: '#ff4081' }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>
             {/* Comment button and count */}
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments.length}</Typography>
            </FlexBetween>
          </FlexBetween>

          {/* Displaying comments if the comments section is open */}
        </FlexBetween>
        {isComments && (
          <Box mt="0.5rem">
            {comments.map((comment, i) => (
              <Box key={`${name}-${i}`}>
                <Divider />
                 {/* Displaying each comment with a divider */}
                <Typography sx={{ color: '#ffffff', m: "0.5rem 0", pl: "1rem" }}>
                  {comment}
                </Typography>
              </Box>
            ))}
            <Divider />
          </Box>
        )}
      </StyledWrapper>
    );
  };

  // Exporting the PostWidget component for use in other parts of the application
  export default PostWidget;