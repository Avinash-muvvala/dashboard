import { Box, Typography } from "@mui/material";
import { useState } from "react";

interface Quiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

interface IndividualQuizCardProps {
  quiz: Quiz;
  index: number;
  color: string;
  onQuizComplete?: (index: number, correct: boolean) => void;
}

const IndividualQuizCard = ({ quiz, index, color, onQuizComplete }: IndividualQuizCardProps) => {
  // Tracks if the user has successfully selected the right option
  const [isCorrectlyAnswered, setIsCorrectlyAnswered] = useState(false);
  // Keeps track of all incorrect options clicked so they stay styled red
  const [wrongAttempts, setWrongAttempts] = useState<number[]>([]);

  const handleAnswerClick = (optionIndex: number) => {
    // If they already solved it, lock out further interaction
    if (isCorrectlyAnswered) return;

    if (optionIndex === quiz.correctIndex) {
      setIsCorrectlyAnswered(true);
      if (onQuizComplete) onQuizComplete(index, true);
    } else {
      // Collect wrong index positions dynamically if not already clicked
      if (!wrongAttempts.includes(optionIndex)) {
        setWrongAttempts((prev) => [...prev, optionIndex]);
      }
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      {/* Question Text */}
      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
        Q{index + 1}. {quiz.question}
      </Typography>

      {/* Options Mapping */}
      {quiz.options.map((opt, i) => {
        const isRight = i === quiz.correctIndex;
        const hasGuessedWrong = wrongAttempts.includes(i);

        let bg = "transparent";
        let borderColor = "rgba(15,23,42,0.12)";

        if (isCorrectlyAnswered && isRight) {
          // Permanently green once solved
          bg = "#10B98115";
          borderColor = "#10B981";
        } else if (hasGuessedWrong) {
          // Keep all wrong answers red while they keep guessing
          bg = "#EF444415";
          borderColor = "#EF4444";
        }

        return (
          <Box
            key={i}
            onClick={() => handleAnswerClick(i)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              p: 1,
              mb: 0.5,
              borderRadius: 1.5,
              border: `1.5px solid ${borderColor}`,
              backgroundColor: bg,
              cursor: isCorrectlyAnswered ? "default" : "pointer",
              transition: "all .15s",
              "&:hover": isCorrectlyAnswered
                ? {}
                : { borderColor: color, backgroundColor: `${color}08` },
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color, minWidth: 20 }}
            >
              {String.fromCharCode(65 + i)}.
            </Typography>
            <Typography variant="body2">{opt}</Typography>
          </Box>
        );
      })}

      {/* Explanation Box - Triggers only when the answer is successfully solved */}
      {isCorrectlyAnswered && (
        <Box
          sx={{
            mt: 1,
            p: 1.5,
            borderRadius: 1.5,
            backgroundColor: "#10B98112",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "#059669",
              fontWeight: 600,
              display: "block",
            }}
          >
            ✓ Correct! {quiz.explanation}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default IndividualQuizCard;