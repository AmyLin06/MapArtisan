import { List, Box, Typography, Avatar, TextField } from "@mui/material";
import CommentCard from "./CommentCard";

const CommentSection = (props) => {
  const { comments } = props;

  let JSX = "";
  JSX = comments.map((c, index) => (
    <CommentCard key={"comment" + index} comment={c} />
  ));

  return (
    <Box sx={{ paddingTop: 1 }}>
      <Typography fontWeight="bold" variant="h5" sx={{ marginBottom: 2 }}>
        {comments.length} Comments
      </Typography>

      <Box display="flex">
        <Avatar
          alt="user-profile-pic"
          src={
            "https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-man-wearing-glasses-is-wearing-colorful-background-image_2905240.jpg"
          }
        />
        <TextField
          multiline
          variant="standard"
          placeholder="Add a comment"
          sx={{ marginLeft: 1, width: "100%" }}
        ></TextField>
      </Box>
      <List sx={{ width: "100%" }}>{JSX}</List>
    </Box>
  );
};

export default CommentSection;
