export const healthCheck = (req, res) => {
  res.status(200).json({
    success: true,
    message: "JoyJuncture Backend is Healthy 💚",
  });
};
