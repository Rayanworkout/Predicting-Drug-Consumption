import {Button} from "@/components/ui/button.jsx";
import React from "react";
import useStore from "@/store/store.js";

export function SearchButton() {

    const {chartType, drugData, drugType, getFunctionToCall} = useStore();
    const isItemInDrugList = drugData.some(item => (item.value == drugType));

    return(
      <>
          <Button
              disabled={chartType == 'consumption' ? !isItemInDrugList : true}
              onClick={() => getFunctionToCall()()}
              className={`btn-pdc z-10 px-6 h-12`}>
              Search
          </Button>
      </>
    );
}
export default SearchButton;