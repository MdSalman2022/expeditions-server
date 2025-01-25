import Expedition from "../models/expedition.js";
import Booking from "../models/booking.js";
import { getIO } from "../utils/socket.js";

export const createBooking = async (req, res) => {
  const { expeditionId, seats } = req.body;
  try {
    const expedition = await Expedition.findById(expeditionId);
    if (!expedition) {
      return res.status(404).json({ error: "Expedition not found" });
    }

    if (new Date() > expedition.endDate) {
      return res
        .status(400)
        .json({ error: "This expedition has already ended" });
    }

    if (expedition.bookedSeats + seats > expedition.totalSeats) {
      return res.status(400).json({ error: "Not enough seats available" });
    }

    expedition.bookedSeats += seats;
    await expedition.save();

    const booking = await Booking.create({
      user: req.user.id,
      expedition: expeditionId,
      seats,
    });

    const io = getIO();
    io.to(expeditionId).emit("seats-updated", expedition.bookedSeats);

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("expedition")
      .populate("user", "email");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id).populate("expedition");
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id).populate("expedition");

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const expedition = booking.expedition;
    expedition.bookedSeats -= booking.seats;
    await expedition.save();

    await Booking.findByIdAndDelete(id);

    const io = getIO();
    io.to(expedition._id.toString()).emit(
      "seats-updated",
      expedition.bookedSeats
    );

    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
