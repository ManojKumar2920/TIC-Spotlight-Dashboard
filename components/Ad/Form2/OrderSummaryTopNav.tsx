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
      <div className="flex items-center justify-between h-[48px] bg-transparent text-black px-4">
        <div className="text-lg font-medium">Create a New Ad</div>

        <div className="flex items-center space-x-5 mt-0">
          <Button
            onClick={onAddCreative}
            className="bg-transparent w-[250px] text-black rounded-[30px] flex items-center justify-center gap-2 border border-black hover:bg-white"
          >
            Add another Creative <AddIcon className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryTopNav;
