import type { Response } from "express";
import { validationResult } from "express-validator";
import { PrismaClient, RequestStatus } from "@prisma/client";

import type { AuthRequest } from "../types/auth";

const prisma = new PrismaClient();

export const sendRequest = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const senderId = req.user?.id;
    if (!senderId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { receiver_id } = req.body;

    // Check if receiver exists
    const receiver = await prisma.user.findUnique({
      where: { id: receiver_id },
    });

    if (!receiver) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if request already exists
    const existingRequest = await prisma.matchRequest.findUnique({
      where: {
        sender_id_receiver_id: {
          sender_id: senderId,
          receiver_id,
        },
      },
    });

    if (existingRequest) {
      return res.status(409).json({ error: "Request already exists" });
    }

    // Check if users are already matched
    const existingMatch = await prisma.match.findFirst({
      where: {
        OR: [
          { user1_id: senderId, user2_id: receiver_id },
          { user1_id: receiver_id, user2_id: senderId },
        ],
      },
    });

    if (existingMatch) {
      return res.status(409).json({ error: "Users are already matched" });
    }

    const matchRequest = await prisma.matchRequest.create({
      data: {
        sender_id: senderId,
        receiver_id,
        status: "pending",
      },
      include: {
        sender: {
          select: { id: true, name: true, avatar: true },
        },
        receiver: {
          select: { id: true, name: true, avatar: true },
        },
      },
    });

    res.status(201).json(matchRequest);
  } catch (error) {
    console.error("Send request error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getIncomingRequests = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const requests = await prisma.matchRequest.findMany({
      where: {
        receiver_id: userId,
        status: "pending",
      },
      include: {
        sender: {
          select: { id: true, name: true, avatar: true },
        },
      },
      orderBy: { created_at: "desc" },
    });

    res.json(requests);
  } catch (error) {
    console.error("Get incoming requests error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSentRequests = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const requests = await prisma.matchRequest.findMany({
      where: {
        sender_id: userId,
      },
      include: {
        receiver: {
          select: { id: true, name: true, avatar: true },
        },
      },
      orderBy: { created_at: "desc" },
    });

    res.json(requests);
  } catch (error) {
    console.error("Get sent requests error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const acceptRequest = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const requestId = req.params.id as string;

    const request = await prisma.matchRequest.findFirst({
      where: {
        id: requestId,
        receiver_id: userId,
        status: "pending",
      },
    });

    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    // Update request status
    await prisma.matchRequest.update({
      where: { id: requestId },
      data: { status: "accepted" },
    });

    // Create match
    const match = await prisma.match.create({
      data: {
        user1_id: request.sender_id,
        user2_id: request.receiver_id,
      },
    });

    res.json({ message: "Request accepted", match });
  } catch (error) {
    console.error("Accept request error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const rejectRequest = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const requestId = req.params.id as string;

    const request = await prisma.matchRequest.findFirst({
      where: {
        id: requestId,
        receiver_id: userId,
        status: "pending",
      },
    });

    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    await prisma.matchRequest.update({
      where: { id: requestId },
      data: { status: "rejected" },
    });

    res.json({ message: "Request rejected" });
  } catch (error) {
    console.error("Reject request error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
