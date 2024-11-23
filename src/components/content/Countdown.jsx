import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentDate = now.getDate();
      const currentMonth = now.getMonth();

      let targetDate;
      if (currentDate === 22 && currentMonth === 3) {
        setCountdown("Today is Earth Day!");
        return;
      } else if (currentMonth > 3 || (currentMonth === 3 && currentDate > 22)) {
        targetDate = new Date(currentYear + 1, 3, 22); // April 22nd of next year
      } else {
        targetDate = new Date(currentYear, 3, 22); // April 22nd of the current year
      }

      const difference = targetDate - now;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      setCountdown(`${days}d : ${hours}h : ${minutes}m : ${seconds}s`);
    };

    const timer = setInterval(calculateCountdown, 1000);

    calculateCountdown(); // Call it initially to avoid delay

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center">
      <h2 className="md:text-2xl text-base text-blue-900 mb-4 font-extrabold">Countdown Timer for Earth Day</h2>
      <p className="md:text-4xl text-3xl text-green-600 font-extrabold">{countdown}</p>
    </div>
  );
};

export default CountdownTimer;
