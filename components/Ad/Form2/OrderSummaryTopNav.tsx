import React from "react";
import Link from "next/link";
import { AddIcon } from "../../ReusableComponents/Icon";
import Button from "../../ReusableComponents/Button";

const OrderSummaryTopNav = () => {
    return (
        <div>
            <div className="flex items-center justify-between h-[48px] bg-transparent text-black px-4">
                <div className="text-lg font-medium">Create a New Ad</div>

                <div className="flex items-center space-x-5 mt-0">
                    <Link href="/ad/Form1">
                        <Button className="bg-transparent w-[210px] text-black rounded-[30px] flex items-center justify-center gap-2 border border-black hover:bg-white">
                            Add another Creative <AddIcon className="w-6 h-6" />
                        </Button>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default OrderSummaryTopNav;
