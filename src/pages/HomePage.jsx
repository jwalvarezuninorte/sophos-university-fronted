import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { Jelly } from "@uiball/loaders";

import Drawer from "../components/Drawer";
import { CourseCard } from "../components/CourseCard";
import { AddNewCard } from "../components/AddNewCard";

export const HomePage = () => {
  const [proffesros, setProffesors] = useState([]);

  const [courses, setCourses] = useState([]);
  const [coursesBackup, setCoursesBackup] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchWord, setSearchWord] = useState("");
  const [hideSearchBar, setHideSearchBar] = useState(false);

  const [newCourse, setNewCourse] = useState({
    name: "",
    description: "",
    credits: "",
    limit: "",
    proffesorId: "",
  });

  useEffect(() => {
    async function getCourses() {
      try {
        const response = await axios.get("/courses/");
        setCourses(response.data);
        console.log(response.data);
        setCoursesBackup(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    async function getProffesors() {
      try {
        const response = await axios.get("/proffesors");
        setProffesors([...response.data]);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getProffesors();
    getCourses();
  }, []);

  const searchTerm = (word) => {
    console.log("Searching for: ", word);

    let filteredCourses = courses.filter((course) =>
      course.title.toLowerCase().includes(word.toLowerCase())
    );

    setCourses([...filteredCourses]);

    setHideSearchBar(true);

    console.log(filteredCourses);
  };

  const clearFilters = () => {
    setCourses([...coursesBackup]);
    setHideSearchBar(false);

    setSearchWord("");
  };

  const createCourse = async () => {
    var data = JSON.stringify({
      name: newCourse.name,
      description: newCourse.description,
      credits: newCourse.credits,
      limit: newCourse.limit,
      proffesorId: newCourse.proffesorId,
    });

    var config = {
      method: "post",
      url: "/courses",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    try {
      axios(config)
        .then(function (response) {
          toast.success(`Se ha creado el curso correctamente`, {
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
      <Drawer />
      {!loading ? (
        <div className="container w-full h-full p-10">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <a>Dashboard</a>
              </li>
              <li>
                <a>Cursos</a>
              </li>
              {/* <li>Add Document</li> */}
            </ul>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-black text-3xl">Cursos disponibles</h2>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="form-control">
              {hideSearchBar ? (
                <span
                  onClick={() => clearFilters()}
                  className="btn btn-sm bg-red-300 cursor-pointer normal-case text-black/80 px-10"
                >
                  Limpiar búsqueda para "{searchWord}"
                </span>
              ) : (
                <label className="input-group input-group-sm">
                  <input
                    onChange={(e) => setSearchWord(e.target.value)}
                    type="text"
                    value={searchWord}
                    placeholder="Buscar..."
                    className="input input-bordered input-sm"
                  />
                  <span
                    onClick={() => {
                      searchTerm(searchWord);
                    }}
                    className="bg-indigo-300 cursor-pointer"
                  >
                    Buscar
                  </span>
                </label>
              )}
            </div>
            <div className="flex space-x-2">
              {/* </Link> */}
              {/* <Link to="/course-detail/1">
                <button className="btn btn-sm bg-indigo-600 normal-case">
                </button>
              </Link> */}
              <label
                htmlFor="my-modal-6"
                className="btn btn-sm bg-indigo-600 normal-case modal-button"
              >
                Crear curso
              </label>

              <input type="checkbox" id="my-modal-6" className="modal-toggle" />
              <div className="modal modal-bottom sm:modal-middle">
                <div className="flex">
                  <img
                    src="https://placeimg.com/260/400/arch"
                    className="max-w-sm rounded-lg rounded-r-none shadow-2xl"
                  />
                  <div className="modal-box custom-rounded-modal-box">
                    <h3 className="font-bold text-lg">Crear curso</h3>
                    <p className="py-4">
                      A continuación deberá llenar el formulario para crear un
                      nuevo curso. Recuerde que debe especificar el profesor que
                      dictará dicha materia.
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
                        <span className="label-text">Descripción</span>
                      </label>
                      <textarea
                        className="textarea textarea-bordered w-full"
                        placeholder="Descripción del curso..."
                        onChange={(e) =>
                          setNewCourse({
                            ...newCourse,
                            description: e.target.value,
                          })
                        }
                        value={newCourse.description}
                      ></textarea>
                    </div>
                    <div className="form-control w-full mb-2">
                      <label className="label">
                        <span className="label-text">Total de Créditos</span>
                      </label>
                      <input
                        type="text"
                        placeholder="4"
                        className="input input-bordered w-full"
                        onChange={(e) =>
                          setNewCourse({
                            ...newCourse,
                            credits: e.target.value,
                          })
                        }
                        value={newCourse.credits}
                      />
                    </div>
                    <div className="form-control w-full mb-2">
                      <label className="label">
                        <span className="label-text">
                          Límite de Estudiantes
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="60"
                        className="input input-bordered w-full"
                        onChange={(e) =>
                          setNewCourse({
                            ...newCourse,
                            limit: e.target.value,
                          })
                        }
                        value={newCourse.limit}
                      />
                    </div>
                    <div className="form-control w-full mb-2">
                      <label className="label">
                        <span className="label-text">
                          Profesor para la Clase
                        </span>
                      </label>
                      <select
                        className="select select-bordered w-full"
                        defaultValue="DEFAULT"
                        onChange={(e) =>
                          setNewCourse({
                            ...newCourse,
                            proffesorId: e.target.value,
                          })
                        }
                      >
                        <option disabled value="DEFAULT">
                          Seleccione un profesor
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
                        Crear Curso
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-x-4 gap-y-8 transition-all duration-700">
            <AddNewCard title="Crear curso" />
            <CourseList courses={courses} setCourses={setCourses} />
          </div>
        </div>
      ) : (
        <div className="container w-full h-full flex flex-col justify-center items-center m-auto">
          <Jelly size={80} color="#231F20" />
          <h2 className="my-6">Cargando datos...</h2>
        </div>
      )}
    </div>
  );
};

export const CourseList = ({ courses, setCourses }) => {
  return courses.map((course) => (
    <CourseCard key={course.id} course={course} setCourses={setCourses} />
  ));
};
