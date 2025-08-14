// components/GatorHunt/GatorHunt.jsx
import dynamic from "next/dynamic";
export default dynamic(() => import("./GatorHuntImpl"), { ssr: false });
