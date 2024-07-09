// import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import selkiAvatar from "assets/images/selkiAvatar.svg";

const UserProfile = ({ name, accountType }) => {
    // const [avatarUrl, setAvatarUrl] = useState("");

    // useEffect(() => {
    //   // 백엔드 API 호출
    //   axios
    //     .get("/api/user/avatar")
    //     .then((response) => {
    //       setAvatarUrl(response.data.avatarUrl);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching avatar:", error);
    //     });
    // }, []);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#2C57AC",
                borderRadius: "8px",
                padding: "8px",
                color: "#fff",
                marginBottom: "16px",
            }}
        >
            <Avatar
                alt={name}
                src={selkiAvatar}
                sx={{ width: 48, height: 48, marginRight: "16px" }}
            />
            <Box>
                <Typography variant="body1">{name}</Typography>
                <Typography variant="body2">{accountType}</Typography>
            </Box>
        </Box>
    );
};

export default UserProfile;
