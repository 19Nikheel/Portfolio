import { useState, useEffect, useRef } from "react";

const PDFViewer = ({ pdfUrl }) => {
  const [pdfData, setPdfData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadPDF = async () => {
      try {
        setIsLoading(true);

        // Simulate PDF loading (replace with actual PDF.js in production)
        // For demo, we'll simulate with a placeholder
        setTimeout(() => {
          setPdfData({
            title: "Documentation PDF",
            pages: Array.from({ length: 10 }, (_, i) => ({
              page: i + 1,
              content: `This is page ${i + 1} of the ${pdfUrl
                .split("/")
                .pop()} documentation.`,
            })),
          });
          setTotalPages(10);
          setIsLoading(false);
        }, 1000);

        // In production, you would use pdf.js:
        // const pdfjsLib = window['pdfjs-dist/build/pdf'];
        // pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';
        // const loadingTask = pdfjsLib.getDocument(pdfUrl);
        // const pdf = await loadingTask.promise;
        // setTotalPages(pdf.numPages);
        // setPdfData(pdf);
      } catch (err) {
        setError("Failed to load PDF document");
        setIsLoading(false);
        console.error("PDF loading error:", err);
      }
    };

    loadPDF();
  }, [pdfUrl]);

  useEffect(() => {
    if (pdfData && canvasRef.current && !isLoading) {
      renderPage();
    }
  }, [currentPage, scale, pdfData, isLoading]);

  const renderPage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw simulated PDF page
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw border
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    // Draw page content
    ctx.fillStyle = "#374151";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";

    if (pdfData && pdfData.pages) {
      const pageContent =
        pdfData.pages[currentPage - 1]?.content ||
        `Page ${currentPage} content`;
      const lines = wrapText(ctx, pageContent, canvas.width - 40);

      lines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, 100 + index * 24);
      });
    }

    // Draw page number
    ctx.fillStyle = "#6b7280";
    ctx.font = "14px Arial";
    ctx.fillText(
      `Page ${currentPage} of ${totalPages}`,
      canvas.width / 2,
      canvas.height - 30
    );
  };

  const wrapText = (context, text, maxWidth) => {
    const words = text.split(" ");
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = context.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Loading PDF document...</p>
        <p className="text-sm text-gray-500 mt-2">
          This may take a few moments
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">⚠️</span>
        </div>
        <p className="text-red-600 text-lg font-medium mb-2">{error}</p>
        <p className="text-gray-600">
          Please try again later or contact support
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* PDF Controls */}
      <div className="flex items-center justify-between mb-4 bg-gray-50 p-3 rounded-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage <= 1}
            className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
              currentPage <= 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </button>

          <div className="flex items-center gap-2">
            <span className="text-gray-700 font-medium">Page</span>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                const page = parseInt(e.target.value);
                if (page >= 1 && page <= totalPages) {
                  setCurrentPage(page);
                }
              }}
              className="w-16 px-3 py-2 border border-gray-300 rounded-lg text-center"
            />
            <span className="text-gray-600">of {totalPages}</span>
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
              currentPage >= totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
            }`}
          >
            Next
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="w-8 h-8 rounded-lg bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              aria-label="Zoom out"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>
            <span className="text-gray-700 font-medium min-w-[60px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="w-8 h-8 rounded-lg bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              aria-label="Zoom in"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          <button
            onClick={() => setScale(1)}
            className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Reset Zoom
          </button>
        </div>
      </div>

      {/* PDF Canvas Container */}
      <div className="flex-1 overflow-auto bg-gray-100 rounded-lg">
        <div
          className="relative mx-auto"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "center top",
            transition: "transform 0.3s ease",
          }}
        >
          <canvas
            ref={canvasRef}
            width={800}
            height={1000}
            className="bg-white shadow-lg"
          />
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">
          Page Thumbnails
        </h4>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Array.from(
            { length: Math.min(totalPages, 10) },
            (_, i) => i + 1
          ).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`flex-shrink-0 w-16 h-20 rounded border flex flex-col items-center justify-center ${
                currentPage === pageNum
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-white hover:bg-gray-50"
              }`}
            >
              <span className="text-xs text-gray-600">Page</span>
              <span className="text-lg font-semibold">{pageNum}</span>
            </button>
          ))}
          {totalPages > 10 && (
            <button
              onClick={() => setCurrentPage(11)}
              className="flex-shrink-0 w-16 h-20 rounded border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center"
            >
              <span className="text-gray-600">...</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
