import { lineFoods } from "@/config/constants";
import { useRequestStatus } from "@/hooks/use_request_status";
import { LineFood } from "@/type/line_food";
import ApiClient from "@/utils/api-client";
import { useEffect, useState } from "react";

export const Orders: React.FC = () => {
  const { state, fetching, success } = useRequestStatus();
  const [orderFoods, setOrderFoods] = useState<LineFood>();

  useEffect(() => {
    fetching();

    const client = new ApiClient();
    client.get(lineFoods).then((data) => {
      setOrderFoods(data.line_food_ids);
      success();
    });
  }, []);

  return (
    <>
      注文画面
      {orderFoods ? <div>注文あります。</div> : <div>...</div>}
    </>
  );
};
