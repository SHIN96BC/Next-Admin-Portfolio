import MainCard from "@Src/components/common/cards/MainCard";
import {Box} from "@mui/material";
import CategoryManagement from "@Src/features/classification/category/CategoryManagement";
import queryOptions from "@Src/services/classification/category/queries";
import {getDehydratedQuery, Hydrate} from "@Src/services/react-query";

export default async function CategoryViewPage() {
  const { queryKey, queryFn } = queryOptions.findAll();

  const query = await getDehydratedQuery({ queryKey, queryFn });

  console.log('query = ', query);

  return (
    <MainCard>
      <Box>
        <Hydrate state={{ queries: query ? [query] : [] }}>
          <CategoryManagement />
        </Hydrate>
      </Box>
    </MainCard>
  );
}