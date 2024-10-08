import { FC, useContext, useEffect, useState } from 'react';
import ApiClient from '@/utils/api-client';
import {
  DEFAULT_RAILS_LOCALHOST,
  defaultRestaurantImage,
  lineFoodDestroy,
  lineFoods,
  lineFoodsCount,
  REQUEST_STATE,
} from '@/config/constants';
import { OrderFood, Restaurant } from '@/type';
import OrderHeaderImage from '@/assets/order-header.png';
import styles from './order.module.css';
import { Link } from 'react-router-dom';
import Accordion from '../Accordion/Accordion';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';
import { CartContext, RequestContext } from '@/App';

type OrderInfo = {
  line_foods: OrderFood[];
  restaurant: Restaurant;
  total_price: number;
  total_count: number;
};

export const Orders: React.FC = () => {
  const { requestState, loading, success } = useContext(RequestContext);
  const [orderInfo, setOrderInfo] = useState<OrderInfo>();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const { setCartCount } = useContext(CartContext);

  useEffect(() => {
    fetchOrderFoods();
  }, []);

  const fetchOrderFoods = () => {
    loading();

    const client = new ApiClient();
    client.get(lineFoods).then((res) => {
      setOrderInfo(res.data);
      success();
    });
  };

  const DeleteOrderFoods = (lineFoodId: string) => {
    loading();

    const client = new ApiClient();
    client
      .delete(lineFoodDestroy(lineFoodId))
      .then((res) => {
        setOrderInfo(res.data);
      })
      .then(() => {
        fetchOrderFoods();
      })
      .then(() => {
        client.get(lineFoodsCount).then((res) => {
          setCartCount(res.data.count);
        });
      })
      .finally(() => {
        success();
      });
  };

  const OrdersFood: FC = () => {
    return (
      <>
        {orderInfo && (
          <div className={styles.o_orders__order_wrapper}>
            <div className={styles.o_order__cards_wrapper}>
              <h3 className={styles.o_order__heading}>配達の詳細</h3>
              <div className={styles.o_orders__restaurant_wrapper}>
                <Link className={styles.o_orders__restaurant_link} to={`/restaurants/${orderInfo.restaurant.id}/foods`}>
                  <div className={styles.o_orders__restaurant_contents}>
                    <div
                      className={styles.o_orders__restaurant_image}
                      style={{
                        backgroundImage: orderInfo.restaurant.url
                          ? `url(${DEFAULT_RAILS_LOCALHOST}/${orderInfo.restaurant.url})`
                          : `url(${defaultRestaurantImage})`,
                      }}
                    ></div>
                    <div className={styles.o_orders__restaurant_name}>{orderInfo.restaurant.name}</div>
                  </div>

                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" color="#5E5E5E">
                    <title>Chevron right small</title>
                    <path d="m16.9 12-4.6 6H8.5l4.6-6-4.6-6h3.8l4.6 6Z" fill="currentColor"></path>
                  </svg>
                </Link>
                <div className={styles.o_orders__sub_text}>
                  <span>{orderInfo.restaurant.time_required}分で到着予定</span>
                </div>
                <div className={styles.o_orders__line_wrapper}>
                  <span className={styles.o_orders__sub_text}>配送料</span>
                  <span className={styles.o_orders__sub_text}>¥{orderInfo.restaurant.fee.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className={styles.o_orders__accordion_wrapper}>
              <Accordion
                isOpen={isAccordionOpen}
                setIsOpen={setIsAccordionOpen}
                primary={false}
                label={`カートの中身（${orderInfo.total_count}）`}
                duration={200}
              >
                {orderInfo.line_foods.map((line_food) => {
                  return (
                    <div className={styles.o_orders__line_food_contents} key={line_food.id}>
                      <div className={styles.o_orders__line_food_image_and_name}>
                        <div
                          className={styles.o_orders__line_food_image}
                          style={{ backgroundImage: `url(${DEFAULT_RAILS_LOCALHOST}/${line_food.url})` }}
                        ></div>
                        <div>{line_food.name}</div>
                        <div>¥{line_food.price.toLocaleString()}</div>
                      </div>
                      <div className={styles.o_orders__line_count_and_delete}>
                        <Badge label={line_food.count.toString()} />
                        <button
                          className={styles.o_orders__delete_button}
                          onClick={() => DeleteOrderFoods(line_food.id.toString())}
                        >
                          削除
                        </button>
                      </div>
                    </div>
                  );
                })}
              </Accordion>
            </div>

            <div className={styles.o_order__cards_wrapper}>
              <h3 className={styles.o_order__heading}>注文の合計額</h3>
              <div className={styles.o_orders__line_wrapper}>
                <span>小計</span>
                <span>
                  ¥
                  {orderInfo.line_foods
                    .reduce((sum, line_food) => sum + line_food.price * line_food.count, 0)
                    .toLocaleString()}
                </span>
              </div>
              <div className={styles.o_orders__line_wrapper}>
                <span>配送料</span>
                <span>¥{orderInfo.restaurant.fee.toLocaleString()}</span>
              </div>
              <h3 className={styles.o_orders__total_price_label}>
                合計 <span>¥ {orderInfo.total_price.toLocaleString()}</span>
              </h3>
              <Button type={'success'} isSolid isFull>
                '本ページの内容を確認の上、注文を確定する'
              </Button>
            </div>
          </div>
        )}
      </>
    );
  };

  const NotOrdersFood: FC = () => {
    return (
      <>
        <div className={styles.o_orders__not_order_wrapper}>
          <span className={styles.o_orders__not_order_text}>
            新しいカートを作成するには、レストランやお店から商品を追加します
          </span>
          <img className={styles.o_orders__not_order_image} src={OrderHeaderImage} />
        </div>
      </>
    );
  };

  return (
    requestState.status === REQUEST_STATE.OK && (
      <div className={styles.o_orders}>{orderInfo ? <OrdersFood /> : <NotOrdersFood />}</div>
    )
  );
};
