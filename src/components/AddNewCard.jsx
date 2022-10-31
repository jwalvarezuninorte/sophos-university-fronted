import { Link } from "react-router-dom";

export const AddNewCard = ({ title, route }) => {
  return (
    <Link
      to={route}
      className="py-6 h-full flex flex-col justify-center items-center rounded-xl cursor-pointer border-2 border-dashed border-[#252630] bg-[#252630]/10 hover:bg-[#252630]/30 transition-all text-[#252630]"
    >
      <div className="flex flex-col space-y-2 items-center">
        <i className="bi bi-plus-square-fill text-[30px]"></i>
        <strong>{title}</strong>
      </div>
    </Link>
  );
};
