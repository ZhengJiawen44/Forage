"use client";
import { useCallback, useEffect } from "react";

interface TrackerProps {
  blogID: number;
}
const Tracker = ({ blogID }: TrackerProps) => {
  //calculate the time user spent on a webpage
  let idleStart = new Date().getTime();
  let idleTotal = 0;
  const IDLE_THRESHOLD = 39 * 1000; //in milliseconds

  const startTime = new Date().getTime();
  // Reset idle timer on user activity
  const resetIdleTimer = useCallback(() => {
    const currentTime = new Date().getTime();
    const idleDuration = currentTime - idleStart;

    if (idleDuration > IDLE_THRESHOLD) {
      idleTotal += idleDuration;
    }

    idleStart = currentTime;
  }, []);

  useEffect(() => {
    try {
      //on page load, a view is made
      navigator.sendBeacon(
        "/api/analytics",
        JSON.stringify({ blogID, view: { hasViewed: true } })
      );

      //on scoll, the idle time staring point is reset to NOW, and previous idle time is calculated
      window.addEventListener("scroll", resetIdleTimer);
      let intervalID = setInterval(() => {
        const currentTime = new Date().getTime();
        const idleDuration = currentTime - idleStart;

        if (idleDuration > IDLE_THRESHOLD) {
          console.log("idle! idle for: ", (idleDuration / 1000).toFixed());
          idleTotal = idleDuration + idleTotal;
          idleStart = currentTime; // Reset idle start time
        }
      }, IDLE_THRESHOLD);

      //debugging function
      // function keydown() {
      //   const endTime = new Date().getTime();
      //   const totalTimeInSeconds = (endTime - startTime) / 1000;
      //   const idleTotalSeconds = idleTotal / 1000;
      //   const activeTimeInSeconds = totalTimeInSeconds - idleTotalSeconds;
      //   console.log("active for: ", activeTimeInSeconds);
      // }
      // window.addEventListener("keydown", () => {
      //   keydown();
      // });
      return () => {
        window.removeEventListener("scroll", resetIdleTimer);
        // window.removeEventListener("keydown", keydown);
        clearInterval(intervalID);
        const endTime = new Date().getTime();
        const totalTimeInSeconds = (endTime - startTime) / 1000;
        const idleTotalSeconds = idleTotal / 1000;
        const activeTimeInSeconds = totalTimeInSeconds - idleTotalSeconds;

        // Ensure we don't send negative time
        const finalActiveTime = Math.max(0, activeTimeInSeconds);

        //on leaving the page, has read and it's duration in seconds is sent to the backend
        navigator.sendBeacon(
          "/api/analytics",
          JSON.stringify({
            blogID,
            read: {
              hasRead: true,
              duration: finalActiveTime,
            },
          })
        );
      };
    } catch (error) {
      console.log(error);
    }
  }, []);
  return null;
};

export default Tracker;
