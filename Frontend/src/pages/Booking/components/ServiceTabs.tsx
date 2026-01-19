import { Tabs, Tab, Grid } from "@mui/material";
import ProductItem from "./ProductItem";

export default function ServiceTabs({
  categories,
  products,
  activeCategory,
  onCategoryChange,
  selectedProducts,
  activeRange,
  onCheck,
  onChangeQty,
}: any) {
  return (
    <>
      <Tabs
        value={activeCategory}
        onChange={(_, v) => onCategoryChange(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2 }}
      >
        <Tab label="Tất cả" value="all" />
        {categories.map((c: any) => (
          <Tab key={c.id} label={c.name} value={c.id} />
        ))}
      </Tabs>

      <Grid container spacing={2}>
        {products.map((p: any) => {
          const selected = selectedProducts.find(
            (x: any) => x.productId === p.id,
          );

          return (
            <Grid
              item
              key={p.id}
              xs={12}
              lg={8}
            >
              <ProductItem
                product={p}
                selected={selected}
                disabled={!activeRange}
                onCheck={onCheck}
                onChangeQty={onChangeQty}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
