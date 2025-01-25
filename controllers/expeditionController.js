import Expedition from "../models/expedition.js";
import Booking from "../models/booking.js";

export const createExpedition = async (req, res) => {
  try {
    const expedition = await Expedition.create(req.body);
    res.status(201).json(expedition);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateExpedition = async (req, res) => {
  const { id } = req.params;
  try {
    const expedition = await Expedition.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!expedition) {
      return res.status(404).json({ error: "Expedition not found" });
    }
    res.json(expedition);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteExpedition = async (req, res) => {
  const { id } = req.params;
  try {
    const expedition = await Expedition.findByIdAndDelete(id);
    if (!expedition) {
      return res.status(404).json({ error: "Expedition not found" });
    }
    res.json({ message: "Expedition deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getExpeditions = async (req, res) => {
  try {
    const expeditions = await Expedition.find();
    res.json(expeditions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPopularDestinations = async (req, res) => {
  try {
    const result = await Expedition.aggregate([
      {
        $group: {
          _id: "$destination",
          totalBookings: { $sum: "$bookedSeats" },
        },
      },
      { $sort: { totalBookings: -1 } },
      { $limit: 5 },
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookingsPerMonth = async (req, res) => {
  try {
    const result = await Booking.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalBookings: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
