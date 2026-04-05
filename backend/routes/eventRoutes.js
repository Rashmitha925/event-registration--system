const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// create event (admin)
router.post("/", async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.json(event);
});

// get all events (users see admin events)
router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// register for event
router.put("/register/:id", async (req, res) => {
  const { username, email } = req.body;

  const event = await Event.findById(req.params.id);

  event.registrations.push({ username, email });

  await event.save();

  res.json(event);
});

module.exports = router;