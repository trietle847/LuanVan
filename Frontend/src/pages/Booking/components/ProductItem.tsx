import { Paper, Stack, Typography, Box, Checkbox, Button } from "@mui/material";

export default function ProductItem({
  product,
  selected,
  onCheck,
  onChangeQty,
  disabled,
}: any) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Checkbox
          checked={!!selected}
          disabled={disabled}
          onChange={(e) => onCheck(product, e.target.checked)}
        />
        <Box>
          <Typography fontWeight={600}>{product.name}</Typography>
          <Typography variant="caption" color="success.main">
            {product.price.toLocaleString()}đ
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center">
        <Button
          size="small"
          variant="outlined"
          disabled={!selected || selected.quantity <= 1}
          onClick={() => onChangeQty(product.id, selected.quantity - 1)}
        >
          -
        </Button>
        <Typography width={24} textAlign="center">
          {selected?.quantity || 1}
        </Typography>
        <Button
          size="small"
          variant="outlined"
          disabled={!selected}
          onClick={() => onChangeQty(product.id, selected.quantity + 1)}
        >
          +
        </Button>
      </Stack>
    </Paper>
  );
}
