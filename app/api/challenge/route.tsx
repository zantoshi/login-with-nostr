import { NextResponse } from 'next/server'
import crypto from 'crypto';
import generateRandomNumber from "@/utils/crypto";

 
export async function GET(request: Request) {
    try {
      const min = 1000000000; // Replace with your desired range
      const max = 9999999999;
  
      const generatedNumber = generateRandomNumber(min, max);
      const hash = crypto.createHash('sha256');
      hash.update(generatedNumber.toString());
      const challenge = hash.digest('hex');
  
      return NextResponse.json({ challenge }); // Wrap the challenge in an object
    

  } catch (error:any) {
    return NextResponse.json({ success: false, message: `Unable to generate challenge. ${error}.` })
  }
}