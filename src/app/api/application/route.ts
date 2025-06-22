import { clerkClient, getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const auth = getAuth(req);

    if (!auth.userId) {
      console.warn('[API] Unauthorized request – no userId');
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    console.log('[API] Connected Clerk user ID:', auth.userId);
    console.log('[API] MONGODB_URI:', process.env.MONGODB_URI);

    await connectDB();

    const { userId } = auth;

    // Get the actual Clerk client instance
    // Get the actual Clerk client instance
    const clerk = await clerkClient();

    // Check that clerk is valid before calling getUser
    if (!clerk?.users?.getUser) {
      console.error('[FATAL] clerk.users.getUser is undefined!');
      return new Response(JSON.stringify({ error: 'Server misconfigured: Clerk client not available.' }), { status: 500 });
    }

    // Fetch Clerk user
    let clerkUser;
    try {
      console.log('[API] Fetching Clerk user data...');
      clerkUser = await clerk.users.getUser(userId);
    } catch (err: unknown) {
      console.error('[API] Clerk user fetch failed:', err);
      const message = typeof err === 'object' && err && 'message' in err ? (err as { message?: string }).message : String(err);
      return new Response(
        JSON.stringify({ error: 'Clerk user fetch failed', details: message }),
        { status: 500 }
      );
    }

    // Destructure Clerk data safely
    const email = clerkUser?.primaryEmailAddress?.emailAddress || '';
    const firstName = clerkUser?.firstName || '';
    const lastName = clerkUser?.lastName || '';

    // Upsert into MongoDB
    let user;
    try {
      console.log('[API] Upserting user into MongoDB...');
      user = await User.findOneAndUpdate(
        { clerkId: userId },
        {
          clerkId: userId,
          email,
          firstName,
          lastName,
          updatedAt: new Date(),
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        }
      );
    } catch (err: unknown) {
      console.error('[API] MongoDB upsert failed:', err);
      const message = typeof err === 'object' && err && 'message' in err ? (err as { message?: string }).message : String(err);
      return new Response(
        JSON.stringify({ error: 'MongoDB upsert failed', details: message }),
        { status: 500 }
      );
    }

    console.log('[API] User upserted successfully:', user);

    return new Response(JSON.stringify({ user }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('[API] Unexpected server error:', error);
    const message = typeof error === 'object' && error && 'message' in error ? (error as { message?: string }).message : String(error);
    return new Response(JSON.stringify({ error: message || 'Unknown error' }), {
      status: 500,
    });
  }
}
