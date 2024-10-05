import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import {mailtrapClient,sender} from "./mailtrap.config.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }]
    
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })

        console.log("Email sent Successfully", response);
    } catch (error) {
        console.log("Error send verification", error);

        throw new Error(`Error sending verification email: ${error}`);
    }
    
};

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }]
    
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "c492618b-9bf7-4d64-9d6a-ec9570e99a66",
            template_variables: {
                "company_info_name": "Auth Company",
                "name": name
            }
        })

        console.log("Welcome email sent successfully", response);
    } catch (error) {
        console.log('error sending welcome email', error);

        throw new Error(`Error sending welcome email: ${error}`);
        
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }]
    
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset you password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset"
        })
        console.log("Reset Password email sent successfully", response);
    } catch (error) {
        console.error(`Error sending password reset email`, error);

        throw new Error(`Error sendinf passsword reset email: ${error}`);
    }
    
};

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        })
        console.log("Password rest email sent successfully", response);
    } catch (error) {
        console.error("Error in sending the password reset success email", error);
        throw new Error(`Error sending Password reset success email: ${error}`)
    }
};