// Helper function to add activity log entry with 30-record limit
export const addActivityLog = (user, actionType, referenceId, pointsChange) => {
  const allowedActions = [
    "game_win",
    "game_loss", 
    "points_added",
    "points_deducted",
    "cash_converted",
    "game_purchased"
  ];

  // Only add if actionType is allowed
  if (!allowedActions.includes(actionType)) {
    return;
  }

  const newEntry = {
    actionType,
    referenceId,
    pointsChange,
    date: new Date()
  };

  // Add new entry
  user.activityLog.push(newEntry);

  // Keep only latest 30 records
  if (user.activityLog.length > 30) {
    user.activityLog = user.activityLog.slice(-30);
  }
};