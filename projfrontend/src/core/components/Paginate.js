import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { HiArrowCircleRight, HiArrowCircleLeft } from "react-icons/hi";

const Paginate = ({
  pages,
  page,
  categoryName,
  sortBy = "createdAt",
  sortByOrder = "-1",
}) => {
  return (
    pages > 1 && (
      <Pagination className="my-4 font-weight-bold prosrccenter" pagination>
        <div className="">
          <LinkContainer
            to={
              categoryName && sortBy
                ? `/store/filter/${categoryName}/sort/${sortBy}/${sortByOrder}/page/${
                    page - 1
                  }`
                : categoryName
                ? `/store/filter/${categoryName}/page/${page - 1}`
                : sortBy
                ? `/store/sort/${sortBy}/${sortByOrder}/page/${page - 1}`
                : `/store/page/${page - 1}`
            }
          >
            <Pagination.Item
              disabled={page === 1}
              className=" text-capitalize font-weight-bold text-dark"
            >
              <HiArrowCircleLeft className="text-dark" size="50px" />
            </Pagination.Item>
          </LinkContainer>
        </div>
        <h3 className="mt-3 mx-3">
          <strong>
            {page}/{pages}
          </strong>
        </h3>
        <div className="text-dark">
          <LinkContainer
            to={
              categoryName && sortBy
                ? `/store/filter/${categoryName}/sort/${sortBy}/${sortByOrder}/page/${
                    page + 1
                  }`
                : categoryName
                ? `/store/filter/${categoryName}/page/${page + 1}`
                : sortBy
                ? `/store/sort/${sortBy}/${sortByOrder}/page/${page + 1}`
                : `/store/page/${page + 1}`
            }
          >
            <Pagination.Item
              disabled={page === pages}
              className=" text-capitalize font-weight-bold text-dark"
            >
              <HiArrowCircleRight className="text-dark" size="50px" />
            </Pagination.Item>
          </LinkContainer>
        </div>
      </Pagination>
    )
  );
};

export default Paginate;
