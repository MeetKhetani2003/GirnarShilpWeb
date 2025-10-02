// src/app/api/inquiries/[id]/route.js
import { NextResponse } from 'next/server';

import dbConnect from '@/lib/db';
import Inquiry from '@/models/Inquiry';
import Product from '@/models/Product';

// --- MOCK DATABASE FUNCTIONS (Replace with your actual MongoDB/Prisma logic) ---
// In a real application, you would connect to your database here
// and interact with your Inquiry model.

async function getInquiryFromDB(id) {
  // MOCK: Replace with logic like: return await Inquiry.findById(id);
  console.log(`MOCK: Fetching inquiry ${id}`);
  return {
    _id: id,
    name: 'Mock Customer',
    email: 'mock@example.com',
    phone: '555-1234',
    message: 'This is a detailed mock message about product XYZ.',
    status: 'New', // Add a status field for updating
    productSnapshot: { title: 'Mock Deity Statue' },
  };
}

async function updateInquiryInDB(id, data) {
  // MOCK: Replace with logic like: return await Inquiry.findByIdAndUpdate(id, data, { new: true });
  console.log(`MOCK: Updating inquiry ${id} with status: ${data.status}`);
  return { _id: id, ...data };
}

// ---------------------------------------------------------------------------------

/**
 * Handles GET requests for fetching a specific inquiry.
 * Route: /api/inquiries/[id]
 */
export async function GET(request, { params }) {
  const { id } = params;
  try {
    const inquiry = await getInquiryFromDB(id);
    if (!inquiry) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }
    return NextResponse.json(inquiry, { status: 200 });
  } catch (error) {
    console.error('Error fetching inquiry:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

/**
 * Handles PUT requests for updating a specific inquiry (e.g., status).
 * Route: /api/inquiries/[id]
 */
export async function PUT(request, { params }) {
  const { id } = params;

  try {
    const data = await request.json();

    // Call your actual DB update function
    const updatedInquiry = await updateInquiryInDB(id, data);

    if (!updatedInquiry) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    return NextResponse.json(updatedInquiry, { status: 200 });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    return NextResponse.json(
      { error: 'Internal Server Error during update' },
      { status: 500 }
    );
  }
}

/**
 * Handles DELETE requests for deleting a specific inquiry.
 * Route: /api/inquiries/[id]
 */
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await dbConnect();
    // Call your actual DB delete function
    await Inquiry.findByIdAndDelete(id); // Replace with Inquiry model in real app

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return NextResponse.json(
      { error: 'Internal Server Error during deletion' },
      { status: 500 }
    );
  }
}
