import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";

export const StudentCard = ({ student, setStudents }) => {
  const history = useNavigate();

  const navegateToEditEvent = () => {
    history("/edit-event");
  };

  const deleteStudentFromList = (id) => {
    setStudents((prevStudents) => prevStudents.filter((c) => c.id !== id));
  };

  const deleteStudent = async (id) => {
    console.log("delete student asd", id);

    var data = "";

    var config = {
      method: "delete",
      url: `/students/${id}`,
      headers: {},
      data: data,
    };

    axios(config)
      .then(function (response) {
        toast.success(`Se ha eliminado el estudiante correctamente.`, {
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
        deleteStudentFromList(id);
      })
      .catch(function (error) {
        toast.error(
          `No se puede completar la operación. Usuario cuenta con cursos matriculados o Error en el servidor.`,
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
      });
  };

  const getTextColor = (credits) => {
    if (credits == 0) {
      return "text-red-500 text-sm font-bold";
    }
    if (credits < 5) {
      return "text-indigo-400 text-sm font-bold";
    }
    if (credits < 10) {
      return "text-green-900 text-sm font-bold";
    }
    if (credits < 5) {
      return "text-indigo-400 text-sm font-bold";
    }
    return "text-blue-900 text-sm font-bold";
  };

  return (
    <div className="flex rounded-lg w-auto bg-[#B5C9CA] drop-shadow-[0px_6px_rgba(37,38,48,1)] text-black/90 border border-indigo-900/10">
      <div>
        <label
          htmlFor="my-modal-3"
          className="absolute right-0 m-4 btn btn-sm modal-button btn-square rounded-full bg-black/40 border-2 border-white"
        >
          <i
            onClick={() => deleteStudent(student.id)}
            className="bi bi-x text-lg text-white"
          ></i>
        </label>
      </div>
      <img
        className="h-24 w-24 m-2 shadow-lg rounded-xl"
        src={`https://randomuser.me/api/portraits/men/${student.id + 0}.jpg`}
      />
      <div
        // onClick={navegateToEditEvent}
        className="card-body p-4 hover:cursor-pointer"
      >
        <h2 className="card-title uppercase text-sm font-bold">
          {student.name}
        </h2>
        <div className="flex justify-between">
          <div>
            <div className="text-sm">
              Facultad de{" "}
              <span className="underline">{student["departmentName"]}</span>
            </div>
            <p className={getTextColor(student.totalCredits)}>
              Total Créditos: {student.totalCredits}{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
