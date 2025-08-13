-- Migration V8: Add 1:24 scale stock data
INSERT INTO stock_items (marka, model, renk, stant, kutu_durumu, stok_adedi, satis_fiyati, etsy_satis_fiyati, tedarik, uretici, durum, toptan_alis_fiyati, notlar, olcek) VALUES
('BMW', 'S1000RR', 'Beyaz', 'Yok', 'Mevcut', 8, 599.00, 34.00, 'V', 'Maisto', 'Sıfır', 250.00, 'Küçük ölçek', '1:24'),
('Ducati', 'Panigale V4', 'Kırmızı', 'Yok', 'Mevcut', 6, 649.00, 39.00, 'K', 'Maisto', 'Sıfır', 300.00, 'Küçük ölçek', '1:24'),
('Yamaha', 'YZF R1', 'Mavi', 'Yok', 'Mevcut', 7, 599.00, 34.00, 'V', 'NewRay', 'Sıfır', 250.00, 'Küçük ölçek', '1:24'),
('Kawasaki', 'Ninja H2R', 'Siyah', 'Yok', 'Mevcut', 5, 649.00, 39.00, 'K', 'NewRay', 'Sıfır', 300.00, 'Küçük ölçek', '1:24'),
('Honda', 'CBR1000RR', 'Kırmızı', 'Yok', 'Mevcut', 6, 599.00, 34.00, 'V', 'NewRay', 'Sıfır', 250.00, 'Küçük ölçek', '1:24');
