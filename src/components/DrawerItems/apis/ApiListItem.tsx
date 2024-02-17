import { ListItem } from "../../ListItem";
import { DrawerItems } from "../DrawerItems.enum";
import { Tag } from "../../Tag";
import { useApis } from "../../../hooks/useApis";

export function ApiListItem() {
  const { apiOverrides } = useApis();
  const numberOfOverrides = Object.keys(apiOverrides).length;
  return (
    <ListItem
      id={DrawerItems.APIS}
      label={"APIs"}
      description='Override deployed backend apis with locally running versions'
      tertiary={
        numberOfOverrides > 0 ? (
          <Tag>
            {numberOfOverrides} Override
            {numberOfOverrides > 1 ? "s" : ""} Set
          </Tag>
        ) : undefined
      }
    />
  );
}
