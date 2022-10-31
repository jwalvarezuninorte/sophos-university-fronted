import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const CourseCard = ({ course, setCourses }) => {
  const history = useNavigate();

  const goToCourseDetail = (id) => {
    history(`/courses/${id}`);
  };

  const deleteCouseFromList = (id) => {
    setCourses((prevCourses) => prevCourses.filter((c) => c.id !== id));
  };

  const deleteCourse = async (id) => {
    console.log("delete course", id);
    try {
      const response = await axios.delete(`/courses/${id}`);
      deleteCouseFromList(id);
      toast.success(`El curso se ha eliminado correctamente.`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        icon: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      toast.error(
        `No se puede completar la operación. Probablemente el curso tiene estudiantes inscritos.`,
        {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          icon: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    }
  };

  return (
    <div
      id={course.id}
      className="card w-auto bg-[#B5C9CA] drop-shadow-[0px_6px_rgba(37,38,48,1)] text-black/90 transition-all duration-1000"
    >
      <div>
        <label
          onClick={() => deleteCourse(course.id)}
          className="absolute right-0 m-4 btn btn-sm modal-button btn-square rounded-full bg-black/40 border-2 border-white"
        >
          <i className="bi bi-x text-lg text-white"></i>
        </label>
        {/* <img src={course.image} /> */}
        <img
          src={`https://picsum.photos/id/${course.id + 10}/400/200`}
          alt=""
        />
      </div>
      <div
        onClick={() => goToCourseDetail(course.id)}
        className="card-body p-4 hover:cursor-pointer"
      >
        <h2 className="card-title uppercase text-sm">{course.name}</h2>
        <div className="flex justify-between normal-case">
          <div>
            <p className="text-sm">
              Requiere{" "}
              <span className="text-primary">
                <a href="" className="text-sm underline cursor-pointer">
                  {course.requirement}
                </a>
              </span>
            </p>
            <p className="text-sm">{course.credits} Créditos</p>
            <p className="text-sm">
              {course.limit - course.totalStudents} Cupos disponibles
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
