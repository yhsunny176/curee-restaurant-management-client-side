import ScrollContext from "@/contexts/ScrollContext";
import { useContext } from "react";

const useScroll = () => useContext(ScrollContext);
export default useScroll;
