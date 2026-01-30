import { Box, Typography } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        background: "#0f172a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          mb: 2,
          animation: "fadeIn 1.2s ease-in-out",
        }}
      >
        🚚 DeliverX
      </Typography>

      <Box
        sx={{
          width: 40,
          height: 4,
          background: "linear-gradient(90deg, #2563eb, #f59e0b)",
          borderRadius: 2,
          animation: "loading 1.2s infinite",
        }}
      />

      <style>
        {`
          @keyframes loading {
            0% { width: 20px; }
            50% { width: 80px; }
            100% { width: 20px; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </Box>
  );
};

export default Loader;
