"use client";

export function LocationNavigation({ locationData }) {
  const mapUrl = locationData[0].map_url || "";

  return (
    <div
      id="location"
      className="relative w-full py-12 items-center justify-center text-center bg-cover bg-center bg-[url('/ancient-pura.jpg')]"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(67,73,131,0.70)_10%,rgba(62,97,146,0.70)_30%,rgba(53,135,168,0.70)_52%,rgba(51,166,177,0.70)_75%,rgba(51,166,177,0.70)_89%)] z-0"></div>

      <div className="relative z-10 px-4 mx-auto mt-4 max-w-7xl sm:px-6 lg:px-8">
        <div className="w-full overflow-hidden border-0">
          <div className="relative">
            <h1 className="mb-8 text-4xl font-bold text-white">
              Location Navigation
            </h1>
          </div>
          <div className="p-0">
            <div className="aspect-[15/15] lg:aspect-[21/12] w-full">
              <iframe
                className="w-full h-full rounded-md"
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
