import "./index.scss";
import { DialogTrigger } from "react-aria-components";
import { DevToolsDrawer } from "./components/DevToolsDrawer";
import OpenDevtoolsIcon from "@heroicons/react/24/outline/ChevronLeftIcon";
import { IconButton } from "./components/IconButton";

export default function DevTools() {
  return (
    <DialogTrigger>
      <IconButton
        label={"Open Developer Tools"}
        className={
          "absolute right-0 top-1/2 -mt-4 h-8 bg-white px-0 rounded-r-none"
        }
      >
        <OpenDevtoolsIcon className={"w-6 h-6"} role={"presentation"} />
      </IconButton>
      <DevToolsDrawer />
    </DialogTrigger>
  );
}
