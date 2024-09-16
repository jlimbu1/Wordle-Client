import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../states/store";
import io from "socket.io-client";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const socket = io(import.meta.env.VITE_API_URL as string);
