import React, { useState, useEffect } from "react";
import "../styles.css";
import Cards from "./components/Card";
import { getProducts } from "./helper/coreapicalls";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Paginate from "./components/Paginate";
import { Dropdown } from "react-bootstrap";
import { getCategories } from "../admin/helper/adminapicall";

export default function Store({ match }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const categoryName = match.params.categoryName;
  const sortBy = match.params.sortBy;
  const sortByOrder = match.params.sortByOrder;
  const pageNumber = match.params.pageNumber || 1;

  const preloadCategories = () => {
    getCategories().then((data) => {
      console.log(data);
      if (data.error) {
        setCategories(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadAllProduct = (pageNumber, categoryName, sortBy, sortByOrder) => {
    getProducts(pageNumber, categoryName, sortBy, sortByOrder).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data.products);
        setPage(data.page);
        setPages(data.pages);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    loadAllProduct(pageNumber, categoryName, sortBy, sortByOrder);
    preloadCategories();
  }, [pageNumber, categoryName, sortBy, sortByOrder]);

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="page2">
        <h1 className="headingalt text-dark text-center pt-2 pb-1 text-weight-bold">
          Our Products
        </h1>

        {loading ? (
          <>
            <Container className="p-5 my-5">
              <Spinner
                animation="border"
                role="status"
                style={{
                  width: "100px",
                  height: "100px",
                  margin: "auto",
                  display: "block",
                  color: "black",
                }}
              ></Spinner>
            </Container>
          </>
        ) : error ? (
          errorMessage()
        ) : (
          <div className="container-fluid px-3">
            <Row>
              <Col className="mb-3">
                <Dropdown className="float-left">
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Filter
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {categories &&
                      categories.map((cate, index) => (
                        <Dropdown.Item
                          href={`/store/filter/${cate.name}`}
                          className="h4 font-weight-bold"
                          key={index}
                          value={cate._id}
                        >
                          {cate.name}
                        </Dropdown.Item>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col className="mb-3">
                <Dropdown className="float-end">
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Sort
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      href={
                        categoryName
                          ? `/store/filter/${categoryName}/sort/price/1`
                          : `/store/sort/price/1`
                      }
                      className="h4 font-weight-bold"
                    >
                      Price: Low to High
                    </Dropdown.Item>
                    <Dropdown.Item
                      href={
                        categoryName
                          ? `/store/filter/${categoryName}/sort/price/-1`
                          : `/store/sort/price/-1`
                      }
                      className="h4 font-weight-bold"
                    >
                      Price: High to Low
                    </Dropdown.Item>

                    <Dropdown.Item
                      href={
                        categoryName
                          ? `/store/filter/${categoryName}/sort/createdAt/-1`
                          : `/store/sort/createdAt/-1`
                      }
                      className="h4 font-weight-bold"
                    >
                      Newest
                    </Dropdown.Item>
                    <Dropdown.Item
                      href={
                        categoryName
                          ? `/store/filter/${categoryName}/sort/createdAt/1`
                          : `/store/sort/createdAt/1`
                      }
                      className="h4 font-weight-bold"
                    >
                      Oldest
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Row>
              {products.map((product, index) => (
                <Col key={index} sm={12} md={6} lg={4} xl={4}>
                  <Cards product={product} />
                </Col>
              ))}
            </Row>
            <Paginate
              pages={pages}
              page={page}
              categoryName={categoryName ? categoryName : ""}
              sortBy={sortBy ? sortBy : ""}
              sortByOrder={sortByOrder ? sortByOrder : ""}
            />
          </div>
        )}
      </div>
    </>
  );
}
