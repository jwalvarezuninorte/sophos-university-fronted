import React, { useState, useEffect } from "react";
import axios from "axios";

import Drawer from "../components/Drawer";
import { AddNewCard } from "../components/AddNewCard";
import { StudentCard } from "../components/StudentCard";
import { createRoutesFromElements } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export const CourseDetailPage = () => {
  const [students, setStudents] = useState([]);
  const [selectedCourseInfo, setSelectedCourseInfo] = useState({});
  const [proffesros, setProffesors] = useState([]);

  const [newCourse, setNewCourse] = useState({
    name: "",
    description: "",
    credits: "",
    limit: "",
    studentId: "",
  });

  useEffect(() => {
    const id = window.location.pathname.split("/")[2];
    async function getCourses() {
      try {
        const response = await axios.get(`/courses/${id}`);
        console.log(response.data);
        setStudents(response.data.students);
        setSelectedCourseInfo({ ...response.data });
      } catch (error) {
        console.error(error);
      }
    }

    async function getProffesors() {
      try {
        const response = await axios.get("/students");
        setProffesors([...response.data]);
      } catch (error) {
        console.error(error);
      }
    }
    getProffesors();
    getCourses();
  }, []);

  const createCourse = async () => {
    var data = JSON.stringify({
      courseId: selectedCourseInfo.id,
      studentId: newCourse.studentId,
    });

    console.log(data);

    var config = {
      method: "post",
      url: "/courses/addstudent",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    try {
      axios(config)
        .then(function (response) {
          toast.success(`Se ha agregado el estudiante correctamente`, {
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
          setCourses([
            {
              ...response.data,
              // departmentName: getDepartmentName(newStudent.department),
            },
            ...courses,
          ]);
        })
        .catch(function (error) {
          toast.error(`No se puede completar la operación. ${error}`, {
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
        });
    } catch (error) {
      toast.error(`No se puede completar la operación.`, {
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
    }
  };

  return (
    <div className="flex">
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="flex">
          <img
            src="https://placeimg.com/260/400/arch"
            className="max-w-sm rounded-lg rounded-r-none shadow-2xl"
          />
          <div className="modal-box custom-rounded-modal-box">
            <h3 className="font-bold text-lg">Agregar estudiante</h3>
            <p className="py-4">
              A continuación ingrese los datos del estudiante que desea agregar
              al curso. Recuerde que el estudiante ya debe estar creado.
            </p>
            <div className="form-control w-full mb-2">
              <label className="label">
                <span className="label-text">Nombre del Curso</span>
              </label>
              <input
                type="text"
                placeholder="Diseño de interfaces"
                className="input input-bordered w-full"
                onChange={(e) =>
                  setNewCourse({
                    ...newCourse,
                    name: e.target.value,
                  })
                }
                value={newCourse.name}
              />
            </div>

            <div className="form-control w-full mb-2">
              <label className="label">
                <span className="label-text">
                  Nuevo estudiante para la Clase
                </span>
              </label>
              <select
                className="select select-bordered w-full"
                defaultValue="DEFAULT"
                onChange={(e) =>
                  setNewCourse({
                    ...newCourse,
                    studentId: e.target.value,
                  })
                }
              >
                <option disabled value="DEFAULT">
                  Seleccione un estudiante
                </option>
                {proffesros.map((proffesor) => (
                  <option key={proffesor.id} value={proffesor.id}>
                    {proffesor.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <label htmlFor="my-modal-6" className="btn btn-outline">
                Cancelar
              </label>
              <label
                onClick={() => createCourse()}
                htmlFor="my-modal-6"
                className="btn"
              >
                Agregar
              </label>
            </div>
          </div>
        </div>
      </div>
      <Drawer />
      <div className="container w-full h-full p-10">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <a>Dashboard</a>
            </li>
            <li>
              <a>Cursos</a>
            </li>
            <li>{selectedCourseInfo.name}</li>
          </ul>
        </div>
        <div className="flex flex-col rounded-xl bg-gradient-to-r from-white/60 to-transparent w-full p-10 mb-10 border border-black/40">
          <div className="flex justify-between">
            <h2 className="font-black text-3xl mb-4">
              {selectedCourseInfo["name"]}
            </h2>
            <div className="dropdown dropdown-hover">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-sm text-[#1A1E23] m-1 normal-case"
              >
                Más opciones
                <i className="bi bi-caret-down-fill text-black/30 ml-3"></i>
              </label>
              <ul
                tabIndex="0"
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 space-y-2"
              >
                <button className="btn btn-sm btn-primary normal-case">
                  Editar
                </button>
                <button className="btn btn-sm bg-red-400 normal-case">
                  Eliminar
                </button>
                <button className="btn btn-sm btn-outline normal-case">
                  Exportar estadisticas
                </button>
              </ul>
            </div>
          </div>

          <div
            tabIndex={0}
            className="collapse collapse-open collapse-arrow bg-white/50 rounded-xl my-4"
          >
            <div className="collapse-title font-medium">Detalles del curso</div>
            <div className="collapse-content">
              <p>{selectedCourseInfo["description"]}</p>
              <hr className="my-2" />
              <p>
                <strong>Requiere las materia(s): </strong>
                {selectedCourseInfo["requirement"]},
                {selectedCourseInfo["requirement"]},
                {selectedCourseInfo["requirement"]}
              </p>
              <hr className="my-2" />
              <p>
                <strong>PROFESOR:</strong>{" "}
                {selectedCourseInfo.proffesorName ?? "Profesor pendiente"}
              </p>
            </div>
          </div>
          <div className="flex space-x-6">
            <SimpleInfoCard
              text="Total Créditos"
              number={selectedCourseInfo.credits}
            />

            <Stat
              text="Total inscritos"
              number={
                (selectedCourseInfo.totalStudents / selectedCourseInfo.limit) *
                100
              }
            />
            <Stat
              text="Cupos disponibles"
              number={
                100 -
                (selectedCourseInfo.totalStudents / selectedCourseInfo.limit) *
                  100
              }
            />
          </div>
        </div>

        <div className="flex justify-between">
          <h2 className="font-black text-xl mb-4">
            Lista de estudiantes registrados
          </h2>
          <label
            htmlFor="my-modal-6"
            className="btn btn-sm bg-indigo-600 normal-case modal-button"
          >
            Agregar estudiante
          </label>
        </div>
        <div className="grid grid-cols-3 gap-8">
          <AddNewCard title="Agregar estudiante" />
          <StudentList students={students} />
        </div>
      </div>
    </div>
  );
};

export const StudentList = ({ students }) => {
  return students.map((student) => (
    <StudentCard key={student.id} student={student} />
  ));
};

export const Stat = ({ text, number }) => {
  return (
    <div className="flex flex-col space-y-6 items-center rounded-xl py-6 px-6 bg-indigo-200 hover:drop-shadow-[0px_6px_rgba(12,20,250,0.6)] cursor-default transition-all">
      <div className="flex flex-col space-y-2 items-center">
        <h2 className="text-lg font-bold text-[#1A1E23]">{text}</h2>
      </div>
      <div
        className="radial-progress text-indigo-400"
        style={{
          "--value": number,
          "--thickness": "10px",
          "--size": "80px",
        }}
      >
        <p className="text-[#1A1E23] text-xl font-bold">
          {number}
          <span className="text-sm">%</span>
        </p>
      </div>
    </div>
  );
};

export const SimpleInfoCard = ({ text, number }) => {
  return (
    <div className="flex flex-col space-y-6 items-center rounded-xl py-6 px-6 bg-indigo-200 hover:drop-shadow-[0px_6px_rgba(12,20,250,0.6)] cursor-default transition-all">
      <div className="flex flex-col space-y-2 items-center">
        <h2 className="text-lg font-bold text-[#1A1E23]">{text}</h2>
      </div>
      <p className="text-[#1A1E23] text-[50px] font-bold">{number}</p>
    </div>
  );
};
