import { useContext, useEffect, useState } from "react";
import { CustomContext } from "../../utils/Context/Context";

const ProductInfo = ({ product }) => {
  const {
    user,
    favorites,
    favoritesHandler,
    addCarts,
    addCardsCountPlus,
    addCardsCountMinus,
  } = useContext(CustomContext);

  const [btnPayVisible, setBtnPayVisible] = useState(false);
  const [selectedPSC, setSelectedPSC] = useState(1);

 
  // const { register, handleSubmit } = useForm();
  // const onSubmit = (data) => console.log(data);


useEffect(()=>{setBtnPayVisible(!user.carts?.some((item) => item.id === product.id))},[])
  

  return (
    <div className="purches__inform">
      <h3>{product.title}</h3>
      <p className="purches__inform-category">{product.category}</p>
      <div className="payGroup">
        <p className="payGroup-price">{product.price}₽</p>
        {btnPayVisible ? (
          <button
            form="chengePSC"
            onClick={() => {
              addCarts(product);
              setBtnPayVisible(false)
              setSelectedPSC(1)
            }}
          >
            В корзину
          </button>
        ) : (
          <div className="chengePSC">
            <button
              type="button"
              onClick={() => {
                setSelectedPSC((prev) => {
             
                  return prev > 1 ? prev - 1 : setBtnPayVisible(true);
                  
                });
                addCardsCountMinus(product.id);
              }}
            >
              -
            </button>
            <p>{selectedPSC}</p>
            {/* <input
              placeholder="0"
              type="number"
              value={selectedPSC <= 0 ? "" : selectedPSC} // Если selectedPSC равен 0, то отображаем пустую строку
              min={-Infinity}
              onChange={(e) => {
                const inputValue = Number(e.target.value);
                setSelectedPSC(isNaN(inputValue) ? 0 : inputValue); // Если введено не число, то устанавливаем 0
              }}
            /> */}
            <button
              type="button"
              onClick={() => {
                addCardsCountPlus(product._id);
              }}
            >
              +
            </button>
          </div>
        )}

        <div className="payGroup-favorite">
          <img
            onClick={() => favoritesHandler(product)}
            src={
              favorites.some((el) => el.id === product.id)
                ? "/images/icons/HeartRed.svg"
                : "/images/icons/favorite.svg"
            }
            alt=""
          />
          <p>Добавить в желаемое</p>
        </div>
      </div>

      <div className="productDescription">
        <h4>Описание</h4>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductInfo;
