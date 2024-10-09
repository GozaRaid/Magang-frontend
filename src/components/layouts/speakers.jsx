"use client";

import Image from "next/image";
import { useState } from "react";

function KeynoteSpeakers() {
  const speakers = [
    {
      name: "Assoc. Prof. Dr. Hoshang Kolivand",
      title:
        "School of Computer Science and Mathematics, Liverpool John Moores University, England",
      image: "/HoshangKolivand.jpg",
    },
    {
      name: "Assoc Prof. Dr. Satria Mandala",
      title:
        "Director CoE Humic Engineering, Telkom University, Bandung Indonesia",
      image: "/Satrianew.jpg",
    },
    {
      name: "Prof. Hui-Min David Wang",
      title:
        "Department of Chemical Engineering, Institute of Biomedical Engineering, National Chung Hsing University, Taiwan",
      image: "/HuiMinnew.jpg",
    },
    {
      name: "Prof. Dimitrios Georgakopoulos",
      title:
        "Director, ARC Industrial Transformation Research Hub for Future Digital Manufacturing, Swinburne University Swinburne University of Technology, Australia",
      image: "/Dimitriosneww.jpg",
    },
  ];

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
            <h3 className="mb-2 text-xl font-semibold text-center">
              {speaker.name}
            </h3>
            <p className="text-sm text-center text-gray-600">{speaker.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TutorialSpeaker() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div id="tutorial" className="container px-4 py-8 mx-auto">
      <h1 className="mb-16 text-4xl font-bold">Tutorial Session</h1>
      <div className="overflow-hidden rounded-lg shadow-xl">
        <Image
          src="/tutoriall.png"
          alt="Tutorial Session"
          width={1200}
          height={600}
          onClick={handleImageClick}
          className="cursor-pointer"
        />
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div className="relative max-w-full max-h-full">
            <Image
              src="/tutoriall.png"
              alt="Tutorial Session"
              width={1200}
              height={600}
              className="object-contain max-w-full max-h-full rounded-lg"
            />
            <button
              onClick={closeModal}
              className="absolute p-4 text-xl text-white rounded-full top-1 right-2"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function Speakers() {
  return (
    <div id="speakers" className="min-h-screen">
      <KeynoteSpeakers />
      <TutorialSpeaker />
    </div>
  );
}
