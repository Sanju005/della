import "server-only";

import twilio from "twilio";

function getTwilioClient() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  if (!accountSid) {
    throw new Error("TWILIO_ACCOUNT_SID is not configured.");
  }

  if (!authToken) {
    throw new Error("TWILIO_AUTH_TOKEN is not configured.");
  }

  return twilio(accountSid, authToken);
}

function getVerifyServiceSid() {
  const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

  if (!serviceSid) {
    throw new Error("TWILIO_VERIFY_SERVICE_SID is not configured.");
  }

  return serviceSid;
}

export async function sendPhoneOtp(phoneNumber: string) {
  const client = getTwilioClient();
  const serviceSid = getVerifyServiceSid();

  return client.verify.v2.services(serviceSid).verifications.create({
    to: phoneNumber,
    channel: "sms",
  });
}

export async function verifyPhoneOtp(phoneNumber: string, code: string) {
  const client = getTwilioClient();
  const serviceSid = getVerifyServiceSid();

  return client.verify.v2.services(serviceSid).verificationChecks.create({
    to: phoneNumber,
    code,
  });
}
