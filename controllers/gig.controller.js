import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";

export const createGig = async (req, res, next) => {
  if (!req.isSeller) return next(createError(403, "Only sellers can create a gig!"));

  console.log("Request body:", req.body); // Log the incoming request body

  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });

  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    console.error("Error saving gig:", err); // Log the error details
    next(err);
  }
};



export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig.userId !== req.userId)
      return next(createError(403, "You can delete only your gig!"));

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted!");
  } catch (err) {
    next(err);
  }
};
export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) next(createError(404, "Gig not found!"));
    res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};
export const getGigs = async (req, res, next) => {
  const q = req.query;

  // Log the full query parameters for debugging
  console.log("Query parameters:", q);

  // Build the filters object
  const filters = {
    ...(q.userId ? { userId: q.userId } : {}),  // Ensure userId is correctly passed
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };

  // Log the filters applied to check
  console.log("Filters applied:", filters);

  try {
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
    console.log("Gigs found:", gigs);

    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};


