import { Box, Typography } from "@mui/material"

const Footer = () => {
  return (
    <Box 
        sx={{
            padding: "15px",
            display: "flex",
            justifyContent: "center",
            backgroundColor:"rgb(219, 219, 219)",
        }}
    >
        <Typography>©2025 &nbsp; <a href="https://www.linkedin.com/in/elias-treadway-41293b1b5/" target="_blank">Elias Treadway</a></Typography>
    </Box>
  )
}

export default Footer