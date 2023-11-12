import { Avatar, Box, Typography, Grid } from "@mui/material";

const CommentCard = (props) => {
  const { comment } = props;

  return (
    <Box display="flex">
      <Avatar alt="profile-pic" src={comment.profilePic} />
      <Grid container spacing={1} sx={{ margin: 0 }}>
        <Grid item>
          <Typography>@{comment.username}</Typography>
        </Grid>
        <Grid item>
          <Typography color="textSecondary">{comment.date}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            className="textItem"
            sx={{
              textAlign: "left",
              wordBreak: "break-word",
              maxWidth: "100vw",
            }}
          >
            {comment.comment}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CommentCard;
