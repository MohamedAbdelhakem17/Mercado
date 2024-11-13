exports.verifyEmailBody = (username, code) => `
  <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <h2 style="color: #2c3e50;">Hello ${username},</h2>

    <p style="font-size: 16px;">Thank you for signing up for "MEDICO. To complete the setup of your account, please enter the verification code below:</p>

    <div style="text-align: center; margin: 20px 0;">
      <span style="display: inline-block; padding: 12px 24px; background-color: #3498db; color: #fff; font-size: 24px; border-radius: 5px;">
        ${code.split("").join(" ")}
      </span>
    </div>

    <p style="font-size: 16px;">Please note that this code is valid for only 5 minutes. If you did not request this, please ignore this email.</p>

    <p style="font-size: 16px;">Thank you,<br>The MEDICO Support Team</p>
  </div>
`;


