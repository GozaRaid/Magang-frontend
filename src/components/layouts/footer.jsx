"use client";

import Image from "next/image";

export function Footer() {
  return (
    <footer className="py-8 text-white bg-[linear-gradient(90deg,rgba(67,73,131,1)_10%,rgba(62,97,146,1)_30%,rgba(53,135,168,1)_52%,rgba(51,166,177,1)_75%,rgba(51,166,177,1)_89%)]">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-6 md:mb-0">
            <Image
              src="/logo-icodsa.png"
              alt="ICoDSA Logo"
              width={200}
              height={200}
              className="mb-2"
            />
            <p className="text-sm">
              The International Conference on Data Science and Its Applications
            </p>
          </div>
          <div className="text-center md:text-right">
            <h3 className="mb-2 text-lg font-semibold text-start">
              Supported by:
            </h3>
            <div className="flex space-x-4 items-ce md:justify-end">
              <div style={{ width: "120px", height: "40px" }}>
                <Image
                  src="/logo-telu.png"
                  alt="Telkom University Logo"
                  layout="responsive"
                  width={120}
                  height={40}
                />
              </div>
              <div style={{ width: "120px", height: "40px" }}>
                <Image
                  src="/logo-utm.png"
                  alt="UTM Logo"
                  layout="responsive"
                  width={120}
                  height={40}
                />
              </div>
              <div style={{ width: "80px", height: "40px" }}>
                <Image
                  src="/UBI.png"
                  alt="Other Organization Logo"
                  layout="responsive"
                  width={80}
                  height={40}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4 mt-8 border-t border-white">
          <div className="flex flex-col-reverse items-center justify-between md:flex-row">
            <p className="mt-4 text-sm">&copy; Copyright 2024. ICoDSA</p>
            <div className="mb-2">
              <p className="mb-2 text-sm">Sponsored by:</p>
              <div className="flex space-x-4">
                <Image
                  src="/logo-ieeeindo.png"
                  alt="IEEE Indonesia Section Logo"
                  width={100}
                  height={30}
                />
                <Image
                  src="/logo-humic-text.webp"
                  alt="HUMiC Engineering Logo"
                  width={100}
                  height={30}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
