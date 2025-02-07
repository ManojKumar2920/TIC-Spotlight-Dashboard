"use Client";

import React from "react";
import { AddIcon } from "../../ReusableComponents/Icon";
import Button from "../../ReusableComponents/Button";

type OrderSummaryTopNavProps = {
  onAddCreative: () => void;
  
};

const OrderSummaryTopNav: React.FC<OrderSummaryTopNavProps> = ({ onAddCreative }) => {
  return (
    <div>
      <div className="flex items-center justify-between h-[48px] bg-transparent text-black dark:text-white px-4">
        <div className="font-bold leading-[26px] text-2xl md:font-bold  md:leading-[48px]">Create a New Ad</div>

        <div className="flex items-center space-x-5 mt-0">
          <Button
            onClick={onAddCreative}
            className="bg-transparent w-[250px] text-black dark:text-white rounded-[30px] flex items-center justify-center gap-2 border border-black dark:border-white"
          >
            Add another Creative <AddIcon className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryTopNav;
