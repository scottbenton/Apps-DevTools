import {
  Button,
  DrawerBody,
  DrawerFooter,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { DrawerSubHeader } from '../DrawerSubHeader';
import { ModuleBox } from './ModuleBox';
import { IModule } from '@/types/modules.type';
import { useModules } from '@/providers/ModuleProvider';

export interface OpenModuleDrawerContentProps {
  module: IModule;
  close: () => void;
}

enum OverrideTypes {
  None,
  Local,
  Custom,
}

function getDefaultModuleOverrideOption(override?: string) {
  if (!override) {
    return OverrideTypes.None;
  } else if (override.includes('http://localhost:')) {
    return OverrideTypes.Local;
  } else {
    return OverrideTypes.Custom;
  }
}

function getInitialLocalhostPort(override?: string) {
  if (override?.includes('http://localhost:')) {
    const stringPort = override.replace('http://localhost:', '');
    const port = parseInt(stringPort, 10);
    if (!isNaN(port)) {
      return port;
    }
  }
  return 3000;
}

function getInitialCustomUrl(override?: string) {
  if (override && !override.includes('http://localhost:')) {
    return override;
  }
  return '';
}

export function OpenModuleDrawerContents(props: OpenModuleDrawerContentProps) {
  const { module, close } = props;

  const { overrides, setModuleOverride } = useModules();
  const override = overrides[module.name];

  const [overrideType, setOverrideType] = useState<OverrideTypes>(
    getDefaultModuleOverrideOption(override),
  );

  const initialPort = getInitialLocalhostPort(override);
  const [port, setPort] = useState<number>(initialPort);

  const initalCustomUrl = getInitialCustomUrl(override);
  const [customUrl, setCustomUrl] = useState(initalCustomUrl);

  const handleSubmit = () => {
    if (overrideType === OverrideTypes.None) {
      setModuleOverride(module.name, undefined);
    } else if (overrideType === OverrideTypes.Local) {
      setModuleOverride(module.name, `http://localhost:${port}`);
    } else if (overrideType === OverrideTypes.Custom) {
      setModuleOverride(module.name, customUrl);
    }
  };

  return (
    <>
      <DrawerSubHeader label={module.friendlyName} goBack={close} />
      <DrawerBody>
        <VStack spacing={2} alignItems={'stretch'}>
          <Text
            fontSize={'sm'}
            textTransform={'uppercase'}
            fontWeight={'semibold'}
            textColor={'gray.600'}
          >
            Module Override
          </Text>
          <ModuleBox
            label={'No Override'}
            description={'Use the currently deployed version of this module.'}
            isSelected={overrideType === OverrideTypes.None}
            onSelect={() => setOverrideType(OverrideTypes.None)}
          />
          <ModuleBox
            label={'Local Override'}
            description={
              'Use a version of this module that is running on your machine.'
            }
            isSelected={overrideType === OverrideTypes.Local}
            onSelect={() => setOverrideType(OverrideTypes.Local)}
            input={
              <FormControl zIndex={1}>
                <FormLabel mb={0}>Port</FormLabel>
                <NumberInput
                  value={`${port}`}
                  onChange={(str, value) => setPort(value)}
                >
                  <NumberInputField
                    onFocus={() => setOverrideType(OverrideTypes.Local)}
                  />
                </NumberInput>
                <FormHelperText>The port of your local instance</FormHelperText>
              </FormControl>
            }
          />
          <ModuleBox
            label={'Custom Override'}
            description={
              'Use a version of this module that is running elsewhere (perhaps a branch build)'
            }
            isSelected={overrideType === OverrideTypes.Custom}
            onSelect={() => setOverrideType(OverrideTypes.Custom)}
            input={
              <FormControl zIndex={1}>
                <FormLabel mb={0}>Url</FormLabel>
                <Input
                  value={customUrl}
                  onChange={evt => setCustomUrl(evt.target.value)}
                  onFocus={() => setOverrideType(OverrideTypes.Custom)}
                />
                <FormHelperText>
                  Useful for branch builds. Include the base url of your module.
                </FormHelperText>
              </FormControl>
            }
          />
        </VStack>
      </DrawerBody>

      <DrawerFooter>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={handleSubmit} colorScheme="brand" ml={1}>
          Save & Refresh
        </Button>
      </DrawerFooter>
    </>
  );
}
