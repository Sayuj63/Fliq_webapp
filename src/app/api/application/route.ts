export async function POST(request: Request) {
  // Application form submission is disabled for now
  return new Response(JSON.stringify({ message: "Application endpoint is disabled for now." }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}