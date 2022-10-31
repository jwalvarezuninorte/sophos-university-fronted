import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { Jelly } from "@uiball/loaders";

import Drawer from "../components/Drawer";
import { AddNewCard } from "../components/AddNewCard";
import { ProffesorCard } from "../components/ProffesorCard";

export const ProfessorsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [proffesors, setProffesors] = useState([]);
  const [proffesorsBackup, setProffesorsBackup] = useState([]);
  const [newProffesor, setNewProffesor] = useState({
    first_name: "",
    last_name: "",
    department: "",
  });

  const [loading, setLoading] = useState(true);
  const [searchWord, setSearchWord] = useState("");
  const [hideSearchBar, setHideSearchBar] = useState(false);

  useEffect(() => {
    async function getProffesors() {
      try {
        const response = await axios.get("/proffesors");
        setProffesors(response.data);
        setProffesorsBackup(response.data);
        setLoading(false);
        console.log(response.data);
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
    getProffesors();
    getDepartments();
  }, []);

  const orderStudentsBy = (property) => {
    let sorted = proffesors.sort((a, b) =>
      a[property] < b[property]
        ? 1
        : a[property] === b[property]
        ? a["id"] > b["id"]
          ? 1
          : -1
        : -1
    );
    setProffesors([...sorted]);
    console.log(proffesors);
  };

  const orderAscending = (property) => {
    let sorted = proffesors.sort((a, b) =>
      a[property] > b[property]
        ? 1
        : a[property] === b[property]
        ? a["id"] > b["id"]
          ? 1
          : -1
        : -1
    );
    setProffesors([...sorted]);
    console.log(proffesors);
  };

  const sortByDeparment = (property) => {
    let sorted = proffesors.sort((a, b) =>
      a["departmentName"] > b["departmentName"]
        ? 1
        : a["departmentName"] === b["departmentName"]
        ? a["departmentId"] > b["departmentId"]
          ? 1
          : -1
        : -1
    );
    setProffesors([...sorted]);
    console.log(proffesors);
  };

  const searchTerm = (word) => {
    console.log("Searching for: ", word);

    let filteredProffesors = proffesors.filter((proffesor) =>
      proffesor.name.toLowerCase().includes(word.toLowerCase())
    );

    setProffesors([...filteredProffesors]);

    setHideSearchBar(true);

    console.log(filteredProffesors);
  };

  const clearFilters = () => {
    setProffesors([...proffesorsBackup]);
    setHideSearchBar(false);

    setSearchWord("");
  };

  const getDepartmentName = (id) => {
    let department = departments.find((department) => department.id == id);
    return department.name;
  };

  // TODO: Create New Proffesor with axios
  const createStudent = async () => {
    var data = JSON.stringify({
      firstName: newProffesor.first_name,
      lastName: newProffesor.last_name,
      departmentId: newProffesor.department,
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
          setProffesors([
            {
              ...response.data,
              departmentName: getDepartmentName(newProffesor.department),
            },
            ...proffesors,
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
                <a>Profesores</a>
              </li>
              {/* <li>Add Document</li> */}
            </ul>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-black text-3xl">
              Profesores ({proffesors.length})
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
                    placeholder="Nombre del profesor"
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
                Crear profesor
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
                          setNewProffesor({
                            ...newProffesor,
                            first_name: e.target.value,
                          })
                        }
                        value={newProffesor.first_name}
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
                          setNewProffesor({
                            ...newProffesor,
                            last_name: e.target.value,
                          })
                        }
                        value={newProffesor.last_name}
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
                          setNewProffesor({
                            ...newProffesor,
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
              <AddNewCard title="Crear profesor" />
            </label>
            <StudentList
              proffesors={proffesors}
              setProffesors={setProffesors}
            />
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

export const StudentList = ({ proffesors, setProffesors }) => {
  return proffesors.map((proffesor) => (
    <ProffesorCard
      key={proffesor.id}
      proffesor={proffesor}
      setProffesors={setProffesors}
    />
  ));
};
