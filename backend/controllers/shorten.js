import Shortener from "../models/shortener_model.js";
import crypto from "crypto";
// Create short URL
export const shorten = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    // generate random short string
    const s_url = crypto.randomBytes(4).toString("hex");

    // save to DB
    const newShort = await Shortener.create({ url, s_url });

    // Return full short URL (using server host)
    return res.status(201).json({
      original: url,
      short: `${req.protocol}://${req.get("host")}/api/${s_url}`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Redirect to original URL
export const redirectToUrl = async (req, res) => {
  try {
    const { code } = req.params;

    const shortDoc = await Shortener.findOne({ s_url: code });

    if (!shortDoc) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    // Redirect to original
    return res.redirect(shortDoc.url);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
