import React from "react";
import postGraphic from "../assets/Untitled.png";
import backgroundImage from "../assets/background.jpg";
import { useNavigate } from "react-router-dom";

const PostApp = () => {
  const navigate = useNavigate();

  const goToPosts = () => {
    navigate("/posts");
  };

  return (
    <main
      className="flex justify-center flex-wrap items-center h-[calc(100vh)] bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <section className="bg-white rounded-lg shadow-lg flex items-center flex-wrap w-full md:w-[70%] p-4 md:p-8">
        <div className="flex-1 flex flex-col items-center text-center p-4 md:p-8">
          <h1 className="text-[36px] md:text-[48px] text-[#918787] font-bold pb-8">
            Post App
          </h1>
          <p className="text-[16px] md:text-[18px] text-gray-600 mb-6 md:mb-12 ml-2">
            The Post App is a modern web application designed to allow users to
            create, view, edit, and delete posts in a user-friendly interface.
          </p>
          <button
            onClick={goToPosts}
            className="inline-block px-4 py-2 md:px-5 md:py-3 bg-[#7b51d4] text-white rounded-md transition-colors duration-300 hover:bg-[#5a37a6]"
          >
            Go to Posts
          </button>
        </div>
        <div className="flex justify-center mt-4 md:mt-0">
          <img
            src={postGraphic}
            alt="Post Graphic"
            className="max-w-[270px] md:max-w-[700px] rounded-lg"
          />
        </div>
      </section>
    </main>
  );
};

export default PostApp;
