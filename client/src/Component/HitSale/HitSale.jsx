import { useContext, useEffect, Fragment } from "react";
import { CustomContext } from "../../utils/Context/Context";
import Card from "../Card/Card";


const HitSale = () => {

  const { hitSale, getHitSale } = useContext(CustomContext);
  
  useEffect(() => {
    getHitSale();
  }, []);



console.log(hitSale);

  return (
    <>
      <div className="cards">
        <div className="container">
          <h2>Хиты продаж</h2>
          <div className="cards__wrapper">
      
            {hitSale.map((item) => {
              return (
                
                 
               
                  <Fragment key={item._id}>
                    <Card item={item} />
                  </Fragment>
               
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default HitSale;
