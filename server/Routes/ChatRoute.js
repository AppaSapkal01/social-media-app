import express from 'express';
import { createChat, findChart, userChats } from '../Controllers/ChatController.js';

const router = express.Router();

router.post("/", createChat);
router.get("/:userId", userChats);
router.get("/find/:firstId/:secondId", findChart);

export default router;