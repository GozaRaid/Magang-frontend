"use client";

import { MapPin, Calendar, Mic2 } from "lucide-react";

export function About() {
  return (
    <div
      id="about"
      className="container px-4 pt-12 pb-20 mx-auto mt-12 md:px-6"
    >
      <h1 className="mb-8 text-4xl font-bold">About</h1>
      <div className="flex flex-col gap-8 leading-relaxed tracking-wider md:flex-row">
        <div className="md:w-2/3">
          <p className="mb-8">
            The rapid evolution of contemporary computing technology has
            propelled individuals to generate an unprecedented volume of data,
            characterized by both its size and diversity—a phenomenon
            unparalleled in the annals of computing history. This surge in data
            has sparked a compelling need for effective processing and analysis,
            captivating the attention of researchers who endeavor to propose
            innovative solutions. In response to this burgeoning interest, the
            7th International Conference on Data Science and Its Applications
            (ICoDSA) 2024, themed "Data for Good: Leveraging Data Science for
            Social Impact," has been meticulously organized.
          </p>
          <p className="mb-8">
            The conference serves as a focal point for researchers to share and
            disseminate their noteworthy contributions in the realms of data
            science, computational linguistics, and information science.
            Encompassing a broad spectrum of relevant topics, 7th ICoDSA 2024
            extends a warm invitation to researchers to explore and present
            their latest insights in these dynamic fields.
          </p>
          <p className="mb-2 font-bold">
            Papers from the previous ICoDSA indexed in Scopus:
          </p>
          <ul className="list-disc list-inside">
            <li>1st ICoDIS | IoP Science</li>
            <li>2nd ICoDIS | IoP Science</li>
            <li>3rd ICoDIS (ICoDSA) | IEEE Xplore</li>
            <li>4th ICoDIS (ICoDSA) | IEEE Xplore</li>
            <li>5th ICoDIS (ICoDSA) | IEEE Xplore</li>
            <li>6th ICoDIS (ICoDSA) | IEEE Xplore</li>
          </ul>
        </div>
        <div className="md:w-1/3">
          <div className="mt-4 space-y-6">
            <div className="flex items-start">
              <MapPin className="flex-shrink-0 w-8 h-8 mr-4 text-cyan-800" />
              <div>
                <h2 className="text-xl font-bold">Where</h2>
                <p>Telkom University</p>
              </div>
            </div>
            <div className="flex items-start">
              <Calendar className="flex-shrink-0 w-8 h-8 mr-4 text-cyan-800" />
              <div>
                <h2 className="text-xl font-bold">When</h2>
                <p>Wednesday - Friday</p>
                <p>13 - 15 December 2023</p>
              </div>
            </div>
            <div className="flex items-start">
              <Mic2 className="flex-shrink-0 w-8 h-8 mr-4 text-cyan-800" />
              <div>
                <h2 className="text-xl font-bold">Who</h2>
                <p>
                  Assoc. Prof. Dr. Hoshang Kolivand <br />
                  Assoc Prof. Dr. Satria Mandala <br />
                  Prof. Hui-Min David Wang <br />
                  Prof. Dimitrios Georgakopoulos <br />
                  Dr. Ahsan Morsed (Tutorial)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
