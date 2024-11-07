"use client";

import Image from "next/image";
import { useState } from "react";
import { useFetchSpeakersSection } from "@/features/dashboard/speakers/useFetchSpeakersSection";

function KeynoteSpeakers() {
  const { data, isLoading, error } = useFetchSpeakersSection();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const speakers = data.speakers;

  return (
    <div id="keynote" className="container px-4 py-8 mx-auto">
      <h1 className="mb-16 text-4xl font-bold">Keynote Speakers</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {speakers.map((speaker, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-48 h-48 mb-4 overflow-hidden rounded-full">
              <Image
                src={speaker.image}
                alt={speaker.name}
                width={200}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="mb-2 text-2xl font-semibold text-center">
              {speaker.name}
            </h3>
            <p className="text-sm text-center text-gray-600">{speaker.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// function TutorialSpeaker() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleImageClick = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div id="tutorial" className="container px-4 py-8 mx-auto">
//       <h1 className="mb-16 text-4xl font-bold">Tutorial Session</h1>
//       <div className="overflow-hidden rounded-lg shadow-xl">
//         <Image
//           src="/tutoriall.png"
//           alt="Tutorial Session"
//           width={1200}
//           height={600}
//           onClick={handleImageClick}
//           className="cursor-pointer"
//         />
//       </div>

//       {isModalOpen && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
//           onClick={closeModal}
//         >
//           <div className="relative max-w-full max-h-full">
//             <Image
//               src="/tutoriall.png"
//               alt="Tutorial Session"
//               width={1200}
//               height={600}
//               className="object-contain max-w-full max-h-full rounded-lg"
//             />
//             <button
//               onClick={closeModal}
//               className="absolute p-4 text-xl text-white rounded-full top-1 right-2"
//             >
//               &times;
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

export function Speakers() {
  return (
    <div id="speakers">
      <KeynoteSpeakers />
      {/* <TutorialSpeaker /> */}
    </div>
  );
}
