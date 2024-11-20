import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/userSchema";

export async function POST(req: Request) {
  // POST /api/todo/tasks
  // Create a new task.
  // Required fields: title, description, dueDate
  // Optional fields: isCompleted
  // Returns the created task.

  await connectDB();
  const session = await auth();

  const body = await req.json();

  console.log("POST /api/todo/tasks", session, body);

  //   User.create({
  //     username: session?.user?.name,
  //     cover: session?.user?.image,
  //     email: session?.user?.email,
  //     tasks: [body],
  //   });

  try {
    if (!session || !session.user || !session.user.email) {
      throw new Error("User is not authenticated");
    }

    const result = await User.findOneAndUpdate(
      { email: session.user.email },
      { $setOnInsert: { tasks: [] } },
      { upsert: true, new: true }
    );

    console.log("POST /api/todo/tasks result", result);

    result.tasks.push(body);

    result.save();

    console.log("POST /api/todo/tasks result", result);
    return new Response(
      JSON.stringify({
        res: result,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("POST /api/todo/tasks error", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : String(error),
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET() {
  // GET /api/todo/tasks
  // Get all tasks.
  // Returns all tasks.

  await connectDB();
  const session = await auth();

  const tasks = await User.find(
    {
      email: session?.user?.email,
    },
    {
      tasks: 1,
      _id: 0,
    }
  );

  console.log("GET /api/todo/tasks", tasks);

  return new Response(JSON.stringify(tasks, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
}
