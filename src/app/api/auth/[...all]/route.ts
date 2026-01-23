import { auth } from "@/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

// Get the handlers using the proper Better-Auth method
const { GET: authGET, POST: authPOST } = toNextJsHandler(auth);

export async function POST(request: NextRequest) {
    try {
        const url = new URL(request.url);
        console.log('=== AUTH POST REQUEST ===');
        console.log('Path:', url.pathname);
        console.log('Method:', request.method);
        
        const response = await authPOST(request);
        console.log('=== AUTH POST RESPONSE ===');
        console.log('Status:', response.status);
        return response;
    } catch (error: any) {
        console.error('=== BETTER-AUTH POST ERROR ===');
        console.error('Error:', error);
        console.error('Message:', error?.message || 'Unknown error');
        console.error('Stack:', error?.stack || 'No stack trace');
        
        return NextResponse.json({
            error: 'Authentication error',
            message: error?.message || 'An unexpected error occurred',
            details: process.env.NODE_ENV === 'development' ? error : undefined
        }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        console.log('=== AUTH GET REQUEST ===');
        console.log('Path:', url.pathname);
        console.log('Method:', request.method);
        
        const response = await authGET(request);
        console.log('=== AUTH GET RESPONSE ===');
        console.log('Status:', response.status);
        return response;
    } catch (error: any) {
        console.error('=== BETTER-AUTH GET ERROR ===');
        console.error('Error:', error);
        console.error('Message:', error?.message || 'Unknown error');
        console.error('Stack:', error?.stack || 'No stack trace');
        
        return NextResponse.json({
            error: 'Authentication error',
            message: error?.message || 'An unexpected error occurred',
            details: process.env.NODE_ENV === 'development' ? error : undefined
        }, { status: 500 });
    }
}

