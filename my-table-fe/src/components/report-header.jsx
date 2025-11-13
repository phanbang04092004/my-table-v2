
import { Typography, Box } from "@mui/material";

export function ReportHeader({ title, unit }) {
    return (
        <Box textAlign="center" mb={2}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                ĐVT: {unit}
            </Typography>
        </Box>
    );
}

