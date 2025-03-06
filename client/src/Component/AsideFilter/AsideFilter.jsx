import SelectFilter from "../SelectFilter/SelectFilter";
import RangeInput from "./RangeInput.jsx";
import { Button } from "@mui/material";
import { useContext, useRef } from "react";
import { CustomContext } from "../../utils/Context/Context";
import axios from "../../utils/Axios/Axios";

const AsideFilter = ({
  sort,
  setSort,
  category,
  setCategory,
  slider,
  setSlider,
  setProducts,
  setPages,
  filterBtn,
  setFilterVisible,
  filterVisible,
}) => {
  const { search, setActiveItem } = useContext(CustomContext);
  const asideFilterRef = useRef(null);

  const resetFilter = () => {
    setSort("");
    setCategory("");
    setSlider([0, 0]);
  };

  //  Получаем отфильтрованные продукты

  const getFilterCategory = async () => {
    let sortForFetch = "";
    let orderForFetch = "";
    
    if (sort.length) {
      const sortData = sort.split("_");
      sortForFetch = sortData[0];
      orderForFetch = sortData[1];
    }

    let qweryParamsApi = `${search.length ? `title_like=${search}&` : ""}${
      category.length ? `category=${category}&` : ""
    }${`sort=${sortForFetch}&order=${orderForFetch}`}&limit=6&`;

    let queryParamsFromTo = `price_gte=${slider[0]}&price_lte=${slider[1]}`;

    const res = await axios.get(
      `/api/products/get?${qweryParamsApi}${queryParamsFromTo}`
    );
    setPages(1);
    setProducts(res.data);
    setActiveItem(category);
  };
category
  return (
    <aside
      className={`catalog__aside ${
        !filterVisible && "catalog__aside-unvisible"
      }`}
      ref={asideFilterRef}
      onClick={(e) => {
        e.currentTarget !== asideFilterRef.current && setFilterVisible(false);
      }}
    >
      <div className="catalog__aside-content">
        <h2 className="catalog__aside-title">Раздел</h2>
        <SelectFilter
          title="Категория"
          setSlider={setSlider}
          state={category}
          setState={setCategory}
          array={[
            "Кухни",
            "Спальни",
            "Гостиные",
            "Прихожие",
            "Офисная мебель",
            "Детские",
          ]}
        />
        <SelectFilter
          title="Сортировать"
          state={sort}
          setState={setSort}
          array={["price_asc", "price_desc", "rating_desc"]}
        />
      </div>
      <div className="catalog__aside-content">
        <h2 className="catalog__aside-title">Цена</h2>
        <RangeInput slider={slider} setSlider={setSlider} />
        <div className="catalog__aside-prices">
          <div className="catalog__aside-price">{slider[0]} ₽</div>-
          <div className="catalog__aside-price">{slider[1]} ₽</div>
        </div>
      </div>
      <div className="catalog__aside-btns">
        <Button  variant="contained" onClick={resetFilter}>
          Сбросить
        </Button>
        <Button
          ref={filterBtn}
          variant="contained"
          onClick={() => {
            getFilterCategory();
            setFilterVisible(false);
          }}
        >
          Отфильтровать
        </Button>
      </div>
    </aside>
  );
};

export default AsideFilter;
