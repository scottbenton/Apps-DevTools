import React, { useState } from "react";
import { IModule } from "../../hooks/useModules";
import { DrawerSubHeader } from "../DrawerSubHeader";
import {
  Button,
  Input,
  Label,
  NumberField,
  RadioGroup,
  TextField,
} from "react-aria-components";
import { ModuleRadio } from "./ModuleRadio";

export interface ModuleOverrideProps {
  module: IModule;
  override?: string;
  allOverrides: Record<string, string>;
  goBack: () => void;
}

enum MODULE_OVERRIDE_OPTIONS {
  NONE = "none",
  CUSTOM = "custom",
  LOCAL = "local",
}

function getDefaultModuleOverrideOption(override?: string) {
  if (!override) {
    return MODULE_OVERRIDE_OPTIONS.NONE;
  } else if (override.includes("http://localhost:")) {
    return MODULE_OVERRIDE_OPTIONS.LOCAL;
  } else {
    return MODULE_OVERRIDE_OPTIONS.CUSTOM;
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
  return 3000;
}

function getInitialCustomUrl(override?: string) {
  if (override && !override.includes("http://localhost:")) {
    return override;
  }
  return "";
}

export function ModuleOverride(props: ModuleOverrideProps) {
  const { module, override, goBack, allOverrides } = props;

  const initialModuleOverrideOption = getDefaultModuleOverrideOption(override);
  const initialPort = getInitialLocalhostPort(override);
  const initialCustomUrl = getInitialCustomUrl(override);

  const [selectedModuleOverrideOption, setSelectedModuleOverrideOption] =
    useState(initialModuleOverrideOption);

  const [localhostPort, setLocalhostPort] = useState<number>(initialPort);

  const [customUrl, setCustomUrl] = useState<string>(initialCustomUrl);

  let hasChanged = false;

  if (selectedModuleOverrideOption !== initialModuleOverrideOption) {
    hasChanged = true;
  }
  if (
    selectedModuleOverrideOption === MODULE_OVERRIDE_OPTIONS.LOCAL &&
    initialPort !== localhostPort
  ) {
    hasChanged = true;
  }
  if (
    selectedModuleOverrideOption === MODULE_OVERRIDE_OPTIONS.CUSTOM &&
    initialCustomUrl !== customUrl
  ) {
    hasChanged = true;
  }

  const handleSave = () => {
    let newOverrides = { ...allOverrides };

    if (selectedModuleOverrideOption === MODULE_OVERRIDE_OPTIONS.NONE) {
      delete newOverrides[module.moduleKey];
    } else if (selectedModuleOverrideOption === MODULE_OVERRIDE_OPTIONS.LOCAL) {
      newOverrides[module.moduleKey] = `http://localhost:${localhostPort}`;
    } else if (
      selectedModuleOverrideOption === MODULE_OVERRIDE_OPTIONS.CUSTOM
    ) {
      newOverrides[module.moduleKey] = customUrl;
    }

    localStorage.setItem("module-overrides", JSON.stringify(newOverrides));
    location.reload();
  };

  return (
    <>
      <DrawerSubHeader label={module.name} goBack={goBack} />
      <div className={"px-6"}>
        <RadioGroup
          className="flex flex-col space-y-4 w-full mt-4"
          value={selectedModuleOverrideOption}
          onChange={(option) =>
            setSelectedModuleOverrideOption(option as MODULE_OVERRIDE_OPTIONS)
          }
        >
          <Label
            className={
              "uppercase tracking-wide text-sm text-gray-700 font-semibold"
            }
          >
            Options
          </Label>
          <ModuleRadio
            value={MODULE_OVERRIDE_OPTIONS.NONE}
            label={"None"}
            secondaryText={module.defaultUrl}
          />
          <ModuleRadio
            value={MODULE_OVERRIDE_OPTIONS.LOCAL}
            label={"Local"}
            input={
              <NumberField
                minValue={0}
                formatOptions={{
                  useGrouping: false,
                }}
                className={"flex flex-col"}
                isDisabled={
                  selectedModuleOverrideOption !== MODULE_OVERRIDE_OPTIONS.LOCAL
                }
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
          <ModuleRadio
            value={MODULE_OVERRIDE_OPTIONS.CUSTOM}
            label={"Custom"}
            input={
              <TextField
                className={"flex flex-col"}
                isDisabled={
                  selectedModuleOverrideOption !==
                  MODULE_OVERRIDE_OPTIONS.CUSTOM
                }
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
