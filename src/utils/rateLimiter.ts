import rateLimit from "express-rate-limit";

export const resetPasswordLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 минут
  max: 5, // максимум 5 запросов на IP за 10 минут
  message: "Too many password reset attempts, please try again later.",
});
