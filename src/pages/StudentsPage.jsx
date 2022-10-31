import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { Jelly } from "@uiball/loaders";

import Drawer from "../components/Drawer";
import { StudentCard } from "../components/StudentCard";
import { AddNewCard } from "../components/AddNewCard";

export const StudentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentsBackup, setStudentsBackup] = useState([]);
  const [newStudent, setNewStudent] = useState({
    first_name: "",
    last_name: "",
    department: "",
  });

  const [loading, setLoading] = useState(true);
  const [searchWord, setSearchWord] = useState("");
  const [hideSearchBar, setHideSearchBar] = useState(false);

  useEffect(() => {
    async function getStudents() {
      try {
        const response = await axios.get("/students");
        setStudents(response.data);
        setStudentsBackup(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    async function getDepartments() {
      try {
        const response = await axios.get("/departments");
        setDepartments([...response.data]);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getStudents();
    getDepartments();
  }, []);

  const orderStudentsBy = (property) => {
    let sorted = students.sort((a, b) =>
      a[property] < b[property]
        ? 1
        : a[property] === b[property]
        ? a["id"] > b["id"]
          ? 1
          : -1
        : -1
    );
    setStudents([...sorted]);
    console.log(students);
  };

  const orderAscending = (property) => {
    let sorted = students.sort((a, b) =>
      a[property] > b[property]
        ? 1
        : a[property] === b[property]
        ? a["id"] > b["id"]
          ? 1
          : -1
        : -1
    );
    setStudents([...sorted]);
    console.log(students);
  };

  const sortByDeparment = (property) => {
    let sorted = students.sort((a, b) =>
      a["departmentName"] > b["departmentName"]
        ? 1
        : a["departmentName"] === b["departmentName"]
        ? a["departmentId"] > b["departmentId"]
          ? 1
          : -1
        : -1
    );
    setStudents([...sorted]);
    console.log(students);
  };

  const searchTerm = (word) => {
    console.log("Searching for: ", word);

    let filteredStudents = students.filter((student) =>
      student.name.toLowerCase().includes(word.toLowerCase())
    );

    setStudents([...filteredStudents]);

    setHideSearchBar(true);

    console.log(filteredStudents);
  };

  const clearFilters = () => {
    setStudents([...studentsBackup]);
    setHideSearchBar(false);

    setSearchWord("");
  };

  const getDepartmentName = (id) => {
    let department = departments.find((department) => department.id == id);
    return department.name;
  };

  const createStudent = async () => {
    var data = JSON.stringify({
      firstName: newStudent.first_name,
      lastName: newStudent.last_name,
      departmentId: newStudent.department,
    });

    var config = {
      method: "post",
      url: "/students",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    try {
      axios(config)
        .then(function (response) {
          toast.success(`Se ha creado el estudiante correctamente`, {
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
          setStudents([
            {
              ...response.data,
              departmentName: getDepartmentName(newStudent.department),
            },
            ...students,
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
                <a>Estudiantes</a>
              </li>
              {/* <li>Add Document</li> */}
            </ul>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-black text-3xl">
              Estudiantes ({students.length})
            </h2>

            <div className="dropdown dropdown-end dropdown-hover">
              <label
                tabIndex={0}
                className="btn btn-ghost hover:bg-transparent btn-sm rounded-btn normal-case"
              >
                Ordenar por
                <i className="bi bi-caret-down-fill text-black/30 ml-3"></i>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content p-2 shadow bg-base-100 rounded-box w-40"
              >
                <li onClick={() => orderAscending("fullName")}>
                  <a>Nombre</a>
                </li>
                <li onClick={() => orderStudentsBy("  ")}>
                  <a># de créditos</a>
                </li>
                <li onClick={() => sortByDeparment("deparmentName")}>
                  <a>Facultad</a>
                </li>
                <li onClick={() => orderAscending("id")}>
                  <a>Ninguno</a>
                </li>
              </ul>
            </div>
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
                    placeholder="Nombre de estudiante"
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
                  Crear estudiante
                </button>
              </Link> */}
              {/* The button to open modal */}
              <label
                htmlFor="my-modal-6"
                className="btn btn-sm bg-indigo-600 normal-case modal-button"
              >
                Crear estudiante
              </label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="my-modal-6" className="modal-toggle" />
              <div className="modal modal-bottom sm:modal-middle">
                <div className="flex">
                  <img
                    src="https://placeimg.com/260/400/arch"
                    className="max-w-sm rounded-lg rounded-r-none shadow-2xl"
                  />
                  <div className="modal-box custom-rounded-modal-box">
                    <h3 className="font-bold text-lg">Crear estudiante</h3>
                    <p className="py-4">
                      A continuación deberá llenar el formulario para crear un
                      nuevo estudiante. Recuerde que debe especificar la
                      facultad a la que pertenece el estudiante.
                    </p>
                    <div className="form-control w-full mb-2">
                      <label className="label">
                        <span className="label-text">Nombre</span>
                      </label>
                      <input
                        type="text"
                        placeholder="John"
                        className="input input-bordered w-full"
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            first_name: e.target.value,
                          })
                        }
                        value={newStudent.first_name}
                      />
                    </div>
                    <div className="form-control w-full mb-2">
                      <label className="label">
                        <span className="label-text">Apellido</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Alvarez"
                        className="input input-bordered w-full"
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            last_name: e.target.value,
                          })
                        }
                        value={newStudent.last_name}
                      />
                    </div>
                    <div className="form-control w-full mb-2">
                      <label className="label">
                        <span className="label-text">Facultad</span>
                      </label>
                      <select
                        className="select select-bordered w-full"
                        defaultValue="DEFAULT"
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            department: e.target.value,
                          })
                        }
                      >
                        <option disabled value="DEFAULT">
                          Seleccione una opción
                        </option>
                        {departments.map((department) => (
                          <option key={department.id} value={department.id}>
                            {department.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="modal-action">
                      <label htmlFor="my-modal-6" className="btn btn-outline">
                        Cancelar
                      </label>
                      <label
                        onClick={() => createStudent()}
                        htmlFor="my-modal-6"
                        className="btn"
                      >
                        Crear Usuario
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-x-4 gap-y-8 transition-all duration-700">
            <label htmlFor="my-modal-6">
              <AddNewCard title="Crear estudiante" />
            </label>
            <StudentList students={students} setStudents={setStudents} />
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

export const StudentList = ({ students, setStudents }) => {
  return students.map((student) => (
    <StudentCard key={student.id} student={student} setStudents={setStudents} />
  ));
};
