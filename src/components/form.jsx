import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup for validation

const UserForm = () => {
  const [message, setMessage] = useState(""); // State for displaying response messages

  // Formik form initialization and validation schema
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
      email: Yup.string()
        .email("Invalid email format")
        .notRequired(), // Email is no longer required
    }),
    onSubmit: async (values) => {
      setMessage(""); // Reset message on form submission

      try {
        // Sending POST request to the API
        const response = await fetch(`http://margros-server-ltja38lqd-saiisbacks-projects.vercel.app/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            phone: values.phone,
          }),
        });

        if (!response.ok) {
          // Handle different status codes
          if (response.status === 500) {
            setMessage("Failed to send SMS. Check the number and try again.");
          } else if (response.status === 400) {
            const data = await response.json();
            setMessage(data.message || "User already registered.");
          } else {
            setMessage("An unexpected error occurred. Please try again.");
          }
        } else {
          // Success: 200 response
          setMessage("Check your SMS for the game link.");
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage("An error occurred while registering the user.");
      }
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        margin: 2,
        backgroundColor: "rgba(60, 44, 60, 0.6)",
        borderRadius: "16px",
        boxShadow: 3,
        border: "4px solid #b59e87",
        minHeight: "auto",
        height: "auto",
        width: "100%", // Full width of the parent container
        maxWidth: "400px", // Maximum width of the form box
        "@media (max-width: 600px)": {
          width: "90%", // Shrink to 90% width for smaller screens
        },
      }}
    >
      <Typography variant="h4" sx={{ color: "#F7E9C8" }}>
        Enter Details
      </Typography>

      <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            InputProps={{
              style: { color: "#F7E9C8" }, // Change text color to match the header
            }}
            InputLabelProps={{
              style: { color: "#F7E9C8" }, // Change label color to match the header
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#F7E9C8", // Border color when idle
                },
                "&:hover fieldset": {
                  borderColor: "#F7E9C8", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#F7E9C8", // Border color when focused
                },
              },
            }}
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            InputProps={{
              style: { color: "#F7E9C8" }, // Change text color to match the header
            }}
            InputLabelProps={{
              style: { color: "#F7E9C8" }, // Change label color to match the header
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#F7E9C8", // Border color when idle
                },
                "&:hover fieldset": {
                  borderColor: "#F7E9C8", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#F7E9C8", // Border color when focused
                },
              },
            }}
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              style: { color: "#F7E9C8" }, // Change text color to match the header
            }}
            InputLabelProps={{
              style: { color: "#F7E9C8" }, // Change label color to match the header
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#F7E9C8", // Border color when idle
                },
                "&:hover fieldset": {
                  borderColor: "#F7E9C8", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#F7E9C8", // Border color when focused
                },
              },
            }}
          />
        </Box>

        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#F7E9C8",
            color: "#000000",
            borderColor: "#b59e87",
            "&:hover": {
              backgroundColor: "#e0cda6",
              color: "#000000",
            },
          }}
        >
          Submit
        </Button>

        {/* Display message below the submit button */}
        {message && (
          <Typography variant="body2" sx={{ color: "#e57373", marginTop: 2 }}>
            {message}
          </Typography>
        )}
      </form>
    </Box>
  );
};

export default UserForm;
