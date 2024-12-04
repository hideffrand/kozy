import {
  FaShower,
  FaRegSnowflake,
  FaTv,
  FaCoffee,
  FaTint,
} from "react-icons/fa";
import { BiFridge } from "react-icons/bi";

export const facilities = [
  { key: "bathroom", label: "Bathroom", icon: FaShower, color: "#808080" },
  { key: "ac", label: "AC", icon: FaRegSnowflake, color: "#88c7dc" },
  { key: "tv", label: "TV", icon: FaTv, color: "#808080" },
  { key: "mini_pantry", label: "Mini Pantry", icon: FaCoffee, color: "#895129" },
  { key: "dispenser", label: "Dispenser", icon: FaTint, color: "#1184e8" },
  { key: "fridge", label: "Fridge", icon: BiFridge, color: "#808080" },
];
