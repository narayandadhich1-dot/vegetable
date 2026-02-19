import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Link } from "react-router-dom";
import {
  Timer,
  Kitchen,
  RestaurantMenu,
  PanToolAlt,
  LocalFireDepartment,
} from "@mui/icons-material";


const Home = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        // Fix 2: Subtle warm off-white gradient
        background:
          "radial-gradient(circle at 80% 20%, rgba(255, 61, 0, 0.05) 0%, #fafafa 100%)",
      }}
    >
      <Container maxWidth="lg" sx={{ pt: { xs: 8, md: 15 }, pb: 10 }}>
        <Grid container spacing={6} alignItems="center">
          {/* Left Content */}
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Box sx={{ display: "inline-flex" }}>
                <Typography
                  variant="caption"
                  sx={{
                    bgcolor: alpha("#ff3d00", 0.1),
                    color: "#ff3d00",
                    px: 2,
                    py: 0.5,
                    borderRadius: 5,
                    fontWeight: 700,
                    letterSpacing: 1,
                  }}
                >
                  #1 KITCHEN ASSISTANT IN INDIA
                </Typography>
              </Box>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "2.5rem", md: "3.8rem" },
                  lineHeight: 1.1,
                  color: "#1a1a1a",
                }}
              >
                We Chop. <br />
                <span style={{ color: "#ff3d00" }}>You Create.</span>
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "text.secondary",
                  fontWeight: 400,
                  maxWidth: "480px",
                  lineHeight: 1.6,
                }}
              >
                Gourmet gravies and precision-chopped vegetables delivered in
                minutes. Save 45 minutes of prep time every single day.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, pt: 2 }}>
                <Button
                  variant="contained"
                  component={Link}
                  to="/shop"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: "12px",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "1.1rem",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 8px 25px rgba(255, 61, 0, 0.4)",
                    },
                  }}
                >
                  Explore Menu
                </Button>
              </Box>
            </Stack>
          </Grid>

          {/* Fix 1 & 4: Visual Weight on the Right */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Box sx={{ position: "relative" }}>
              {/* Floating Visual Elements */}
              <Paper
                elevation={10}
                sx={{
                  p: 3,
                  borderRadius: "24px",
                  width: "280px",
                  position: "relative",
                  zIndex: 2,
                  transform: "rotate(-3deg)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=300"
                  alt="Chopped Veggies"
                  style={{ width: "100%", borderRadius: "16px" }}
                />
                <Typography sx={{ mt: 2, fontWeight: 800 }}>
                  Pre-Chopped Onions
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Ready to sauté • Save 10 mins
                </Typography>
              </Paper>

              <Paper
                elevation={10}
                sx={{
                  p: 2,
                  borderRadius: "24px",
                  width: "240px",
                  position: "absolute",
                  top: "100px",
                  right: "0",
                  zIndex: 1,
                  transform: "rotate(5deg)",
                  bgcolor: "#ff3d00",
                  color: "white",
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <RestaurantMenu />
                  <Box>
                    <Typography sx={{ fontWeight: 800 }}>
                      Makhani Gravy
                    </Typography>
                    <Typography variant="caption">
                      Just add paneer/veg
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Feature Cards with Micro-interactions */}
      <Container sx={{ pb: 10 }}>
        <Grid container spacing={3} justifyContent="center">
          {[
            {
              icon: <Timer />,
              title: "15-Min Cooking",
              desc: "Our prep work cuts your cooking time by more than half.",
            },
            {
              icon: <Kitchen />,
              title: "Vacuum Sealed",
              desc: "Freshness locked in with industry-grade eco-packaging.",
            },
            {
              icon: <PanToolAlt />,
              title: "Chef's Choice",
              desc: "Perfectly diced, sliced, and minced by automated precision.",
            },
            {
              icon: <LocalFireDepartment />,
              title: "Zero Waste",
              desc: "No peels, no stalks, no mess. You only pay for what you cook.",
            },
          ].map((feature, index) => (
            // Changed md={4} to md={6} to create the 2x2 pair logic
            <Grid item xs={12} sm={6} md={5} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: "20px",
                  border: "1px solid rgba(0,0,0,0.05)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    borderColor: "#ff3d00",
                  },
                }}
              >
                <Box
                  sx={{ color: "#ff3d00", mb: 2, "& svg": { fontSize: 40 } }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
