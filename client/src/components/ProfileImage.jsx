import { Box } from "@mui/material";
import { styled } from "@mui/system";

const ProfileImage = ({ image, size = "60px" }) => {
  // Check if picture is not defined or an empty string
  if (!image) {
    return null; // or provide a default image or placeholder
  }

  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:4000/assets/${image}`}
      />
    </Box>
  );
};

export default ProfileImage;
