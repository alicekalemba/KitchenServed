export const getTimeOfDayAndMeal = () => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return { timeOfDay: 'morning', mealType: 'Breakfast' };
  } else if (hour < 18) {
    return { timeOfDay: 'afternoon', mealType: 'Lunch' };
  } else {
    return { timeOfDay: 'evening', mealType: 'Dinner' };
  }
};

export const getTimeOfDay = () => getTimeOfDayAndMeal().timeOfDay;
export const getMealTypeByTime = () => getTimeOfDayAndMeal().mealType;
