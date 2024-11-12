// import cron from "node-cron";
// import User from "./Models/userModel";
// // now the below code will run from   we need
// // Schedule the cron job
// cron.schedule("0 * * * *", async () => {
//   // it should run once a day mate // need to make ammednments
//   // Runs every hour at 0 minutes
//   try {
//     const now = new Date();
//     const deletedUsers = await User.deleteMany({
//       otpExpiresAt: { $lte: now },
//       otp: { $exists: true }, // Ensure we only delete users with an unused OTP
//     });
//     console.log(
//       `Deleted ${deletedUsers.deletedCount} users with expired OTPs.`
//     );
//   } catch (error) {
//     console.error("Error running OTP cleanup cron job:", error);
//   }
// });
