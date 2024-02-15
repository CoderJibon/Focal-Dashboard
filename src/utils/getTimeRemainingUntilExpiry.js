const getTimeRemainingUntilExpiry = (expiryDateString) => {
  // Parse the expiry date string into a Date object
  const expiryDate = new Date(expiryDateString);

  // Get the current date and time
  const currentDate = new Date();

  // Calculate the difference in milliseconds between the expiry date and the current date
  const timeDiff = expiryDate.getTime() - currentDate.getTime();

  // Convert the time difference to days, hours, minutes, and seconds
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  // Return an object with the time components
  return `${days} day / ${hours} hour / ${minutes} minutes / ${seconds} seconds`;
};

export default getTimeRemainingUntilExpiry;
