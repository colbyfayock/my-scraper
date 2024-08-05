export async function POST(request: Request) {
  const { siteUrl } = await request.json();
  return Response.json({
    siteUrl
  })
}