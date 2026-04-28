import type { RootState } from "../redux/store";
import { useSelector } from "react-redux";

export const useAppSelector = useSelector.withTypes<RootState>()