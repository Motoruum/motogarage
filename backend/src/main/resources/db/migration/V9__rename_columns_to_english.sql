-- Migration V9: Rename all columns from Turkish to English
-- Rename columns to English equivalents
ALTER TABLE stock_items RENAME COLUMN marka TO brand;
-- model column is already named correctly, no need to rename
ALTER TABLE stock_items RENAME COLUMN olcek TO scale;
ALTER TABLE stock_items RENAME COLUMN renk TO color;
ALTER TABLE stock_items RENAME COLUMN stant TO stand;
ALTER TABLE stock_items RENAME COLUMN kutu_durumu TO box_status;
ALTER TABLE stock_items RENAME COLUMN stok_adedi TO stock_quantity;
ALTER TABLE stock_items RENAME COLUMN satis_fiyati TO sale_price;
ALTER TABLE stock_items RENAME COLUMN etsy_satis_fiyati TO etsy_price;
ALTER TABLE stock_items RENAME COLUMN tedarik TO supply;
ALTER TABLE stock_items RENAME COLUMN uretici TO manufacturer;
ALTER TABLE stock_items RENAME COLUMN durum TO condition;
ALTER TABLE stock_items RENAME COLUMN toptan_alis_fiyati TO wholesale_price;
ALTER TABLE stock_items RENAME COLUMN notlar TO notes;
