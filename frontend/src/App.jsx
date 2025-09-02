import { useState } from "react";
import { Copy, Check, X } from "lucide-react";
import axios from "axios";

export default function UrlInput() {
  const [url, setUrl] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const BASE_URI = import.meta.env.VITE_BACKEND_URI;

  const handleClick = async () => {
    if (!url.trim()) return;
    try {
      const res = await axios.post(`${BASE_URI}/shorten`, { url });
      setSubmittedUrl(res.data.short);
      setCopied(false);
    } catch (err) {
      console.error("Error shortening URL:", err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(submittedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setUrl("");
    setSubmittedUrl("");
    setCopied(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
        >
          Submit
        </button>
        <button
          onClick={handleClear}
          className="bg-gray-400 text-white px-4 py-2 rounded-xl hover:bg-gray-500 transition flex items-center gap-1"
        >
          <X className="w-4 h-4" /> Clear
        </button>
      </div>

      {submittedUrl && (
        <div className="flex items-center justify-between mt-4 bg-gray-100 px-3 py-2 rounded-xl">
          <a
            href={submittedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate text-blue-600 underline"
          >
            {submittedUrl}
          </a>
          <button
            onClick={handleCopy}
            className="ml-2 p-2 bg-gray-200 rounded-xl hover:bg-gray-300 transition"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
