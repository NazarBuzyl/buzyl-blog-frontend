const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const secondsAgo = Math.floor((now - date) / 1000);

  if (secondsAgo < 60) {
    return "Just now";
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
  } else if (date.getDate() === now.getDate() - 1) {
    const formattedTime = date.toLocaleString([], {
      hour: "numeric",
      minute: "numeric",
    });
    return `Yesterday at ${formattedTime}`;
  } else {
    const formattedDate = date.toLocaleString([], {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return formattedDate;
  }
};

export default formatRelativeTime;
