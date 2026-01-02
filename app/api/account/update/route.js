// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import bcrypt from "bcryptjs";
// import { v2 as cloudinary } from "cloudinary";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function POST(req) {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const userId = session.user.id;

//   const formData = await req.formData();

//   const name = formData.get("name");
//   const password = formData.get("password");
//   const image = formData.get("image");

//   let updatedData = { name };

//   // If password changed
//   if (password && password.trim() !== "") {
//     const hashed = await bcrypt.hash(password, 10);
//     updatedData.password = hashed;
//   }

//   // If image uploaded
//   if (image && image.size > 0) {
//     const arrayBuffer = await image.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     const upload = await cloudinary.uploader.upload_stream(
//       { folder: "users" },
//       async (error, result) => {
//         if (error) throw error;
//         updatedData.image = result.secure_url;
//       }
//     );

//     upload.end(buffer);
//   }

//   const updated = await prisma.user.update({
//     where: { id: userId },
//     data: updatedData,
//   });

//   return NextResponse.json({ success: true, user: updated });
// }
