import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Avatar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const ProfileSection = ({ user, onGrowClick }) => {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Stack spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: "primary.main", width: 64, height: 64 }}>
            <PersonIcon />
          </Avatar>

          <Typography variant="h6" fontWeight={600}>
            {user.name}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Role: {user.role}
          </Typography>

          {/* Single Entry Button */}
          {user.role === "customer" && (
            <Button
              variant="outlined"
              onClick={onGrowClick}
              sx={{ borderRadius: 2 }}
            >
              🔥 Grow with DeliverX
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
