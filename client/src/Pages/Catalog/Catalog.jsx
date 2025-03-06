import { Fragment, useState, useContext, useEffect, useRef } from "react";
import AsideFilter from "../../Component/AsideFilter/AsideFilter";
import { CustomContext } from "../../utils/Context/Context";
import axios from "../../utils/Axios/Axios";
import Card from "../../Component/Card/Card";

const Catalog = () => {
  const { products, setProducts, category, setCategory, pages, setPages } =
    useContext(CustomContext);
  const [countPages, setCountPages] = useState(0);
  const [sort, setSort] = useState("");
  const [slider, setSlider] = useState([0, 300000]);
  const [filterVisible, setFilterVisible] = useState(false);
  const filterBtn = useRef(null);

  const getMinMaxPrice = (prod) => {
    let allPrices = [];
    prod.map((item) => {
      allPrices = [...allPrices, item.price];
    });
    allPrices = allPrices.sort((a, b) => a - b);

    setSlider([allPrices[0], allPrices.at(-1)]);
  };

  // const fetchAllProducts = async () => {
  //   try {
  //     const getAllProducts = await axios.get(
  //       `api/products/get?category=${category}&pages=${pages}&limit=6`
  //     );
  //     const data = await getAllProducts.data.products;
  //     const totalPages = getAllProducts.data.totalPages;
  //     getAllProducts.length && getMinMaxPrice(getAllProducts);

  //     setProducts(data);
  //     setCountPages(totalPages);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchAllProducts();
  // }, [pages]);

  useEffect(() => {
    products.length && getMinMaxPrice(products);
  }, [products]);

  return (
    <main>
      <div className="catalog">
        <div className="container">
          <button
            className="catalog__open-filter"
            onClick={() => {
              setFilterVisible((prev) => !prev);
            }}
          >
            {filterVisible ? "Закрыть" : "Фильтр"}
          </button>
          <div className="catalog__inner">
            <AsideFilter
              slider={slider}
              setSlider={setSlider}
              category={category}
              setCategory={setCategory}
              sort={sort}
              setSort={setSort}
              setPages={setPages}
              setProducts={setProducts}
              filterBtn={filterBtn}
              setFilterVisible={setFilterVisible}
              filterVisible={filterVisible}
            />

            <div className="catalog__content">
              <div className="catalog__content_inner">
                {products &&
                  products.length &&
                  products.map((item) => {
                    return (
                      <Fragment key={item._id}>
                        <Card item={item} />
                      </Fragment>
                    );
                  })}
              </div>
              {countPages === 1 ? (
                ""
              ) : (
                <div className="catalog__content_btns">
                  <button
                    onClick={() => {
                      pages > 1 ? setPages((prev) => prev - 1) : null;
                    }}
                  >
                    Прев.
                  </button>
                  <p>{pages}</p>
                  <button
                    onClick={() => {
                      setPages((prev) => (countPages > prev ? prev + 1 : prev));
                    }}
                  >
                    След.
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Catalog;
