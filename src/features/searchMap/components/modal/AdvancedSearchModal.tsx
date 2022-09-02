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
    <Modal open={open} onClose={handleClose}>
      <FormProvider {...searchMapFormMethods}>
        <AdvancedSearchInput />
        {/* @TODO  button section on submit */}
      </FormProvider>
    </Modal>
  );
};
