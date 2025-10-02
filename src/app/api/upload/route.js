// src/app/api/upload/route.js
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request) {
  let uploadedFilePaths = [];

  try {
    // 1. Get FormData from the standard Web Request object
    const formData = await request.formData();

    // 2. Access all files under the key 'images'
    const files = formData.getAll('images');

    if (files.length === 0 || !(files[0] instanceof File)) {
      return NextResponse.json(
        { success: false, error: 'No image files found in request.' },
        { status: 400 }
      );
    }

    // 3. Define the destination folder
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products');
    await fs.mkdir(uploadDir, { recursive: true });

    // 4. Process and save each file
    for (const file of files) {
      // Get the raw data buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate a unique and safe filename
      const originalFilename = file.name || 'uploaded_file';
      const fileExtension = path.extname(originalFilename);
      const sanitizedFilename = originalFilename
        .replace(/[^a-z0-9\.]/gi, '_')
        .toLowerCase();
      const uniqueFilename = `${Date.now()}-${sanitizedFilename.slice(
        0,
        20
      )}${fileExtension}`;
      const filePath = path.join(uploadDir, uniqueFilename);

      // Write the buffer to the file system (saves the file)
      await fs.writeFile(filePath, buffer);

      // Store the public URL path
      uploadedFilePaths.push(`/uploads/products/${uniqueFilename}`);
    }

    return NextResponse.json(
      {
        success: true,
        uploadedFilePaths: uploadedFilePaths,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Native file upload error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'File upload failed. Internal Server Error.',
      },
      { status: 500 }
    );
  }
}
