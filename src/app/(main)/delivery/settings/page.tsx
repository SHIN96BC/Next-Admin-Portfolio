import MainCard from "@Src/components/common/cards/MainCard";
import {Box} from "@mui/material";
import DeliverySettings from "@Src/features/delivery/settings/DeliverySettings";

export default function DeliverySettingViewPage() {
  return (
    <MainCard>
      <Box>
        <DeliverySettings />
      </Box>
    </MainCard>
  );
}