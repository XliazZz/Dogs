import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from "react-paginate";
import Card from "../Card/Card";
import CardLoading from "../CardLoading/CardLoading";
import style from "./Paginate.module.css";

const Paginate = ({ items }) => {

  const loadingGetDogs = useSelector((state) => state.loadingGetDogs);
  const errorGetDogs = useSelector((state) => state.errorGetDogs);
  const successGetDogs = useSelector((state) => state.successGetDogs);

  const { pageNumber } = useParams();
  const [currentPage, setCurrentPage] = useState(
    pageNumber ? pageNumber - 1 : 0
  );
  const itemsPerPage = 10;

  // Calcula la sección de elementos para mostrar en la pagina actual.
  const offset = currentPage * itemsPerPage;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0); // Muestra la parte superior de la pagina
  };

  const currentItems = items.slice(offset, offset + itemsPerPage);

  // calcula el número de páginas en función de la cantidad de elementos
  const pageCount = Math.ceil(items.length / itemsPerPage);

  return (
    <>
      <div className="row row-cols-1 row-cols-md-2">

        {/* Mostrar CardLoading si loadingGetDogs es true */}
        {loadingGetDogs && !successGetDogs &&
          Array.from({ length: 8 }).map((_, index) => (
            <div className="col mb-4" key={index}>
              <CardLoading />
            </div>
          ))}

        {successGetDogs && currentItems.map((dog) => (
            <div className="col mb-4" key={dog.id}>
              <Card
                key={dog.id}
                _id={dog._id}
                id={dog.id}
                image={dog.image}
                name={dog.name}
                height={dog.height}
                weight={dog.weight}
                life_span={dog.life_span}
              />
            </div>
          ))}
      </div>

      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={style["pagination"]}
        pageClassName={style["page-item"]}
        pageLinkClassName={style["page-link"]}
        previousClassName={
          currentPage === 0 ? style["page-item disabled"] : style["page-item"]
        }
        previousLinkClassName={style["page-link"]}
        nextClassName={
          currentPage === pageCount - 1
            ? style["page-item disabled"]
            : style["page-item"]
        }
        nextLinkClassName={style["page-link"]}
        breakClassName={style["page-item"]}
        breakLinkClassName={style["page-link"]}
        activeClassName={style["active"]}
        disabledClassName={style["disabled"]}
        forcePage={currentPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        previousLabel={currentPage === 0 ? null : "Back"}
        nextLabel={currentPage === pageCount - 1 ? null : "Next"}
      />
    </>
  );
};

export default Paginate;
