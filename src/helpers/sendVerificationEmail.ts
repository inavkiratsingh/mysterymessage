import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from '@/types/ApiResponse';
import nodemailer from 'nodemailer'



const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "navs6164@gmail.com",
    pass: "zaikyfotvqltvois",
  },
});


export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    // await resend.emails.send({
    //   from: 'dev@hiteshchoudhary.com',
    //   to: email,
    //   subject: 'Mystery Message Verification Code',
    //   react: VerificationEmail({ username, otp: verifyCode }),
    // });


    await transporter.sendMail({
      from: 'navs6164@gmail.com', // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      html: VerificationEmail({username, otp:verifyCode}), // plain text body
    });

    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}
