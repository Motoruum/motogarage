-- Migration V5: Add 1:6 scale stock data
INSERT INTO stock_items (marka, model, renk, stant, kutu_durumu, stok_adedi, satis_fiyati, etsy_satis_fiyati, tedarik, uretici, durum, toptan_alis_fiyati, notlar, olcek) VALUES
('BMW', 'S1000RR', 'Beyaz-Mavi', 'Mevcut', 'Mevcut', 1, 2499.00, 129.00, 'K', 'Maisto', 'Sıfır', 1200.00, 'Büyük ölçek', '1:6'),
('Ducati', 'Panigale V4', 'Kırmızı', 'Mevcut', 'Mevcut', 1, 2899.00, 149.00, 'V', 'Maisto', 'Sıfır', 1400.00, 'Büyük ölçek', '1:6'),
('Harley Davidson', 'Street Glide', 'Siyah', 'Mevcut', 'Mevcut', 1, 3499.00, 179.00, 'K', 'Maisto', 'Sıfır', 1700.00, 'Büyük ölçek', '1:6');
