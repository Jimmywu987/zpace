import { AdvancedSearchInput } from "@/features/searchMap/components/AdvanceSearchInput";
import { useSearchMapFormResolver } from "@/features/searchMap/schemas/useSearchMapFormResolver";
import { SearchMapInputTypes } from "@/features/searchMap/types/searchMapInputTypes";
import { loadingSelector } from "@/redux/loading";
import Modal from "@mui/material/Modal";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
export const AdvancedSearchModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(loadingSelector);
  const currentDate = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;
  const searchMapFormMethods = useForm<SearchMapInputTypes>({
    resolver: useSearchMapFormResolver(),
    defaultValues: {
      content: "",
      numPpl: 0,
      range: [20, 500],
      pickedDate: currentDate,
    },
  });
  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="flex justify-center items-center"
    >
      <div className="bg-white p-4 w-96 rounded space-y-4">
        <FormProvider {...searchMapFormMethods}>
          <div className="text-2xl font-medium text-theme-color1">Filter</div>
          <AdvancedSearchInput />
          <div className="flex justify-end space-x-3">
            <button className="text-gray-800 px-3 py-1 hover:bg-gray-50 font-medium text-lg">
              Close
            </button>
            <button className="bg-theme-color1 text-white px-3 py-1 hover:bg-theme-color1/80 font-medium text-lg">
              Search Again
            </button>
          </div>
        </FormProvider>
      </div>
    </Modal>
  );
};
