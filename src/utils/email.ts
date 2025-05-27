// Simple Email Placeholder Utility
export const sendEmail = async (to: string, subject: string, text: string) => {
  console.log("--- Sending Email ---");
  console.log("To:", to);
  console.log("Subject:", subject);
  console.log("Text:", text);
  console.log("---------------------");
  // Replace this with actual implementation using SendGrid, Mailgun, etc.
  return true;
};
