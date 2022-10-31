import React from "react";
import Drawer from "../components/Drawer";

export const ProjectDocumentationPage = () => {
  return (
    <div className="flex">
      <Drawer />
      <div className="flex flex-col w-full">
        <iframe
          src="src\assets\file.pdf"
          width="100%"
          height="550px"
          className="h-screen"
        ></iframe>
        <div className="sticky top-0 z-10 flex justify-center text-sm p-4 custom-bg-color text-base-content">
          <div>
            <p>
              ✨ Desarrollado por{" "}
              <a
                className="text-indigo-800 underline"
                href="https://github.com/jwalvarezuninorte"
              >
                jwalvarez
              </a>{" "}
              para el reto 2022 Sophos Academy ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
