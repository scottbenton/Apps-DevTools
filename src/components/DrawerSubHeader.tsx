import { IconButton } from "./IconButton";
import { Heading } from "react-aria-components";
import ArrowLeft from "@heroicons/react/24/solid/ChevronLeftIcon";

export interface DrawerSubHeaderProps {
  label: string;
  goBack: () => void;
}

export function DrawerSubHeader(props: DrawerSubHeaderProps) {
  const { label, goBack } = props;

  return (
    <div className={"flex items-center px-6 py-2 bg-gray-700 text-white"}>
      <IconButton label={"back"} onPress={goBack} variant={"dark"}>
        <ArrowLeft className={"w-6 h-6"} role={"presentation"} />
      </IconButton>
      <Heading
        id={"drawer-subheader-label"}
        level={2}
        className={"text-xl font-semibold ml-2"}
      >
        {label}
      </Heading>
    </div>
  );
}
