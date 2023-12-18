import {
  List,
  Box,
  Typography,
  Avatar,
  TextField,
  SwipeableDrawer,
} from "@mui/material";
import CommentCard from "./CommentCard";
import React, { useState } from "react";
import { SmallCustomButton } from "./SmallCustomButton";

const CommentSection = (props) => {
  const { comments } = props;
  const [open, setOpen] = useState(false);

  const handleCommentClick = () => {
    // editStore.loadMapComments();
    setOpen(true);
  };

  let JSX = "";
  JSX = comments.map((c, index) => (
    <CommentCard key={"comment" + index} comment={c} />
  ));

  return (
    <>
      {["right"].map((anchor) => (
        <>
          <SmallCustomButton
            onClick={handleCommentClick}
            tooltipTitle="View/Write comments"
            text={"Comments"}
            disable={false}
          />
          <SwipeableDrawer
            anchor={anchor}
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            PaperProps={{ sx: { width: "25%" } }}
          >
            <Box sx={{ padding: 1 }}>
              <Typography
                fontWeight="bold"
                variant="h5"
                sx={{ marginBottom: 2 }}
              >
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
          </SwipeableDrawer>
        </>
      ))}
    </>
  );
};

export default CommentSection;
