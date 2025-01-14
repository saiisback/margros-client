import React, { useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CasinoIcon from '@mui/icons-material/Casino'; // Import Casino icon
import { useEffect } from "react";

const DiceGame = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [diceResult, setDiceResult] = useState(null);
  const [message, setMessage] = useState("Roll the dice and see your luck!");
  const [gamePlayed, setGamePlayed] = useState(false); 

  useEffect(() => {
      // Check localStorage if the game has been played
      const playedGame = localStorage.getItem("playedGame");
      if (playedGame === "true") {
        setGamePlayed(true); // Set state to true if game was played previously
      }
    },[])

  const handleRoll = () => {
    setMessage("Rolling..."); // Show a rolling message while dice are rolling
    setTimeout(() => {
      const randomChance = Math.random() * 100; // Random chance between 0 and 100
      let result;

      // 75% chance to get 2, 4, or 6
      if (randomChance <= 75) {
        // Randomly pick between 2, 4, or 6
        const possibleResults = [2, 4, 6];
        result = possibleResults[Math.floor(Math.random() * possibleResults.length)];
      } else {
        // 25% chance to get any number from 1 to 6
        result = Math.floor(Math.random() * 6) + 1;
      }

      setDiceResult(result);

      // Custom messages based on the dice result
      if (result === 1) {
        setMessage("You rolled a 1! Congratulations, you get 5% off!");
      } else if (result === 2) {
        setMessage("You rolled a 2! Better luck next time!");
      } else if (result === 3) {
        setMessage("You rolled a 3! Congratulations, you get 10% off!");
      } else if (result === 4) {
        setMessage("You rolled a 4! Better luck next time!");
      } else if (result === 5) {
        setMessage("You rolled a 5! Congratulations, you get 15% off!");
      } else if (result === 6) {
        setMessage("You rolled a 6! Better luck next time!");
      }
    }, 1000);
    localStorage.setItem("playedGame", "true");
    setGamePlayed(true);
     // Simulate a delay to mimic dice rolling animation
     const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (token) {
          fetch('http://localhost:3001/api/game-played', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }), // Send the token in the request body
          })
            .then((response) => response.json())
            .then((data) => {
              console.log('Game played status updated:', data);
            })
            .catch((error) => {
              console.error('Error updating game played status:', error);
            });
        } else {
          console.log('No token found in localStorage');
        }
  };

  const handleCancel = () => {
    navigate("/home"); // Redirect to the home page
  };

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
        [theme.breakpoints.down("sm")]: {
          padding: 2,
          margin: 1,
        },
        "@media (max-height: 500px)": {
          height: "80vh", // Set height to 200px if viewport height is less than 500px
        },
      }}
    >
      <Typography variant="h4" sx={{ color: "#F7E9C8" }}>
        Dice & Dine
      </Typography>

      <Typography variant="body1" sx={{ marginTop: 2, color: "#F7E9C8" }}>
        {message}
      </Typography>

      {/* Dice icon - Display it only if dice has not been rolled yet */}
      {!diceResult && (
        <CasinoIcon sx={{ fontSize: "4rem", marginTop: 3, color: "#F7E9C8" }} />
      )}

      {diceResult && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 3,
            padding: 3,
            backgroundColor: "#F7E9C8",
            borderRadius: "8px",
            boxShadow: 2,
            width: "100px",
            height: "100px",
            fontSize: "3rem",
            fontWeight: "bold",
            color: "#000000",
          }}
        >
          {diceResult}
        </Box>
      )}

      {/* Prizes section */}
      <Box sx={{ marginTop: 3, backgroundColor: "#F7E9C8", padding: 2, borderRadius: "8px",
       "@media (max-height: 500px)": {
          height: "150px",
          margin:"0px",
          padding:"1px" // Set height to 200px if viewport height is less than 500px
        }, }}>
        <Typography variant="h6" sx={{ color: "#000000",
         "@media (max-height: 500px)": {
          fontSize:"1px", // Set height to 200px if viewport height is less than 500px
        },
         }}>Prizes:</Typography>
        <ul>
          <li>1: 5% off</li>
          <li>2: Better luck next time</li>
          <li>3: 10% off</li>
          <li>4: Better luck next time</li>
          <li>5: 15% off</li>
          <li>6: Better luck next time</li>
        </ul>
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Button
          onClick={handleRoll}
          variant="contained"
          color="primary"
          sx={{
            marginRight: 2,
            backgroundColor: "#F7E9C8",
            color: "#000000",
            borderColor: "#b59e87",
            "&:hover": {
              backgroundColor: "#e0cda6",
              color: "#000000",
            },
          }}
          disabled={gamePlayed}
        >
          Roll
        </Button>

        <Button
          onClick={handleCancel}
          variant="outlined"
          color="secondary"
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
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default DiceGame;
