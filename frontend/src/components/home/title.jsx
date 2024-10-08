import { Typography } from "@mui/material";
import { keyframes } from "@emotion/react";

// Define the keyframes for the animation
const pulse = keyframes`
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(1.04);
  }
`;
export default function Title() {
    return (
        <Typography sx={{
            marginTop: '200px',
            fontSize: '120px',
            color: 'white',
            textShadow: '-2px 0 0 black, 0 2px 0 black, -2px 2px 0 black',
            textAlign: 'center',
            animation: `${pulse} 0.7s steps(2, end) infinite`,
            transformOrigin: 'bottom'
        }}>
            <span className="tiny5-regular">POKETRACKER</span>
        </Typography>
    );
}