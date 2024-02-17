import { useState } from "react";
import { DrawerSubHeader } from "../../DrawerSubHeader";
import {
  Button,
  Input,
  Label,
  NumberField,
  RadioGroup,
  TextField,
} from "react-aria-components";
import { OverridableUrlRadio } from "./OverridableUrlRadio";

export interface OverridableUrlFormProps {
  label: string;
  defaultUrl: string;
  override?: string;
  goBack: () => void;
  setOverride: (newUrl: string | undefined) => void;
}

enum OverrideOptions {
  NONE = "none",
  CUSTOM = "custom",
  LOCAL = "local",
}

function getDefaultUrlOverrideOption(override?: string) {
  if (!override) {
    return OverrideOptions.NONE;
  } else if (override.includes("http://localhost:")) {
    return OverrideOptions.LOCAL;
  } else {
    return OverrideOptions.CUSTOM;
  }
}

function getInitialLocalhostPort(override?: string) {
  if (override && override.includes("http://localhost:")) {
    const stringPort = override.replace("http://localhost:", "");
    const port = parseInt(stringPort);
    if (!isNaN(port)) {
      return port;
    }
  }
  return 3002;
}

function getInitialCustomUrl(override?: string) {
  if (override && !override.includes("http://localhost:")) {
    return override;
  }
  return "";
}

export function OverridableUrlForm(props: OverridableUrlFormProps) {
  const { label, defaultUrl, override, goBack, setOverride } = props;

  const initialOverrideOption = getDefaultUrlOverrideOption(override);
  const initialPort = getInitialLocalhostPort(override);
  const initialCustomUrl = getInitialCustomUrl(override);

  const [selectedOverrideOption, setSelectedOverrideOption] = useState(
    initialOverrideOption
  );

  const [localhostPort, setLocalhostPort] = useState<number>(initialPort);

  const [customUrl, setCustomUrl] = useState<string>(initialCustomUrl);

  let hasChanged = false;

  if (selectedOverrideOption !== initialOverrideOption) {
    hasChanged = true;
  }
  if (
    selectedOverrideOption === OverrideOptions.LOCAL &&
    initialPort !== localhostPort
  ) {
    hasChanged = true;
  }
  if (
    selectedOverrideOption === OverrideOptions.CUSTOM &&
    initialCustomUrl !== customUrl
  ) {
    hasChanged = true;
  }

  const handleSave = () => {
    let newUrl: string | undefined;
    if (selectedOverrideOption === OverrideOptions.NONE) {
      newUrl = undefined;
    } else if (selectedOverrideOption === OverrideOptions.LOCAL) {
      newUrl = `http://localhost:${localhostPort}`;
    } else if (selectedOverrideOption === OverrideOptions.CUSTOM) {
      newUrl = customUrl;
    }

    setOverride(newUrl);
  };

  return (
    <>
      <DrawerSubHeader label={label} goBack={goBack} />
      <div className={"px-6"}>
        <RadioGroup
          className='flex flex-col space-y-4 w-full mt-4'
          value={selectedOverrideOption}
          onChange={(option) =>
            setSelectedOverrideOption(option as OverrideOptions)
          }
        >
          <Label
            className={
              "uppercase tracking-wide text-sm text-gray-700 font-semibold"
            }
          >
            Options
          </Label>
          <OverridableUrlRadio
            value={OverrideOptions.NONE}
            label={"None"}
            secondaryText={defaultUrl}
          />
          <OverridableUrlRadio
            value={OverrideOptions.LOCAL}
            label={"Local"}
            input={
              <NumberField
                minValue={0}
                formatOptions={{
                  useGrouping: false,
                }}
                className={"flex flex-col"}
                isDisabled={selectedOverrideOption !== OverrideOptions.LOCAL}
                value={localhostPort}
                onChange={setLocalhostPort}
              >
                <Label
                  className={
                    "text-sm uppercase font-semibold tracking-wide text-gray-700 disabled:text-gray-500"
                  }
                >
                  Port
                </Label>
                <Input
                  className={
                    "px-4 py-2 border border-solid border-gray-300 rounded-lg bg-white disabled:bg-gray-200"
                  }
                />
              </NumberField>
            }
          />
          <OverridableUrlRadio
            value={OverrideOptions.CUSTOM}
            label={"Custom"}
            input={
              <TextField
                className={"flex flex-col"}
                isDisabled={selectedOverrideOption !== OverrideOptions.CUSTOM}
                value={customUrl}
                onChange={setCustomUrl}
              >
                <Label
                  className={
                    "text-sm uppercase font-semibold tracking-wide text-gray-700 disabled:text-gray-500"
                  }
                >
                  URL
                </Label>
                <Input
                  className={
                    "px-4 py-2 border border-solid border-gray-300 rounded-lg bg-white disabled:bg-gray-200"
                  }
                />
              </TextField>
            }
          />
        </RadioGroup>
        <div className={"flex justify-end mt-6"}>
          <Button
            onPress={handleSave}
            isDisabled={!hasChanged}
            className={
              "rounded-lg bg-devtools-700 text-white hover:bg-devtools-800 transition-colors duration-150 ease-in-out font-semibold px-4 py-3 disabled:bg-gray-300 disabled:text-gray-600"
            }
          >
            Save & Reload
          </Button>
        </div>
      </div>
    </>
  );
}
