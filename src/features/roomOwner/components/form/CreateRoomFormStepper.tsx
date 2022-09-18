import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useFormContext } from "react-hook-form";

const STEPS = [
  "Basic Information of Your Space",
  "Photos and Rental Services Availability",
];
export const CreateRoomFormStepper = () => {
  const { watch } = useFormContext();
  const step = watch("step");
  return (
    <Box>
      <Stepper activeStep={step} alternativeLabel>
        {STEPS.map((label) => (
          <Step
            key={label}
            sx={{
              "& .MuiStepLabel-root .Mui-completed": {
                color: "#5455a9", // circle color (COMPLETED)
              },
              "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                {
                  color: "#5455a9", // Just text label (COMPLETED)
                },
              "& .MuiStepLabel-root .Mui-active": {
                color: "#5455a9", // circle color (ACTIVE)
              },
              "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                {
                  color: "#5455a9", // Just text label (ACTIVE)
                },
              "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                fill: "white", // circle's number (ACTIVE)
              },
            }}
          >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
