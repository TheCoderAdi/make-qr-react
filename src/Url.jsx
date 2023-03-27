import React, { useEffect, useState } from "react";
import "./app.scss";
import QRCode from "qrcode";

const Url = () => {
  const [url, setUrl] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState(null);

  //For  generating qr
  const generateQr = async (text) => {
    if (!url) alert("Please provide a url");
    else {
      try {
        const qrDataUrl = await QRCode.toDataURL(text);
        setQrDataUrl(qrDataUrl);
      } catch (err) {
        alert("Please try again later");
      }
    }
  };

  useEffect(() => {
    if (url === "") setQrDataUrl("");
  });
  //copy to clipboard
  const handleCopyToClipboard = async () => {
    try {
      const blob = await fetch(qrDataUrl).then((r) => r.blob());
      const item = new ClipboardItem({ "image/png": blob });
      await navigator.clipboard.write([item]);
      alert("Copied to clipboard!");
      setQrDataUrl(null);
      setUrl("");
    } catch (error) {
      alert("Error copying image to clipboard");
    }
  };

  return (
    <>
      <div className="qr-container">
        <div className="input-url">
          <h2>Generate Your QR</h2>
          <input
            type="text"
            placeholder="type your url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button onClick={() => generateQr(url)}>Generate</button>
          {url && qrDataUrl ? (
            <div className="qr-actions">
              <img
                src={qrDataUrl}
                alt="QR code"
                style={{
                  aspectRatio: 1,
                  height: "20vh",
                  boxShadow: "0 0 10px #fff",
                }}
              />
              <div className="qr-buttons">
                <button onClick={handleCopyToClipboard}>
                  Copy to Clipboard
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Url;
