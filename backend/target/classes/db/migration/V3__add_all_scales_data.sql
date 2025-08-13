-- Add sample data for all scales
-- 1:6 Scale (Large models)
INSERT INTO stock_items (marka, model, renk, stant, kutu_durumu, stok_adedi, satis_fiyati, etsy_satis_fiyati, tedarik, uretici, durum, toptan_alis_fiyati, notlar, olcek) VALUES
('BMW', 'S1000RR', 'Beyaz-Mavi', 'Mevcut', 'Mevcut', 2, 2499.00, 129.00, 'K', 'Maisto', 'Sıfır', 1200.00, 'Büyük ölçek', '1:6'),
('Ducati', 'Panigale V4', 'Kırmızı', 'Mevcut', 'Mevcut', 1, 2899.00, 149.00, 'V', 'Maisto', 'Sıfır', 1400.00, 'Büyük ölçek', '1:6'),
('Harley Davidson', 'Street Glide', 'Siyah', 'Mevcut', 'Mevcut', 1, 3499.00, 179.00, 'K', 'Maisto', 'Sıfır', 1700.00, 'Büyük ölçek', '1:6');

-- 1:9 Scale
INSERT INTO stock_items (marka, model, renk, stant, kutu_durumu, stok_adedi, satis_fiyati, etsy_satis_fiyati, tedarik, uretici, durum, toptan_alis_fiyati, notlar, olcek) VALUES
('Yamaha', 'YZF R1', 'Mavi', 'Yok', 'Mevcut', 3, 1899.00, 89.00, 'V', 'NewRay', 'Sıfır', 900.00, 'Orta ölçek', '1:9'),
('Kawasaki', 'Ninja ZX-10R', 'Yeşil', 'Mevcut', 'Mevcut', 2, 1999.00, 99.00, 'K', 'NewRay', 'Sıfır', 950.00, 'Orta ölçek', '1:9'),
('Honda', 'CBR1000RR', 'Kırmızı', 'Yok', 'Mevcut', 1, 1899.00, 89.00, 'V', 'NewRay', 'Sıfır', 900.00, 'Orta ölçek', '1:9');

-- 1:10 Scale
INSERT INTO stock_items (marka, model, renk, stant, kutu_durumu, stok_adedi, satis_fiyati, etsy_satis_fiyati, tedarik, uretici, durum, toptan_alis_fiyati, notlar, olcek) VALUES
('BMW', 'R1250 GS', 'Mavi-Beyaz', 'Mevcut', 'Mevcut', 2, 1699.00, 79.00, 'V', 'Maisto', 'Sıfır', 800.00, 'Orta ölçek', '1:10'),
('Ducati', 'Multistrada', 'Kırmızı', 'Yok', 'Mevcut', 1, 1799.00, 89.00, 'K', 'Maisto', 'Sıfır', 850.00, 'Orta ölçek', '1:10'),
('KTM', 'SuperDuke 1290', 'Turuncu', 'Mevcut', 'Mevcut', 1, 1699.00, 79.00, 'V', 'Maisto', 'Sıfır', 800.00, 'Orta ölçek', '1:10');

-- 1:18 Scale (Default scale - already exists, adding more variety)
INSERT INTO stock_items (marka, model, renk, stant, kutu_durumu, stok_adedi, satis_fiyati, etsy_satis_fiyati, tedarik, uretici, durum, toptan_alis_fiyati, notlar, olcek) VALUES
('BMW', 'S1000RR', 'Siyah', 'Mevcut', 'Mevcut', 5, 899.00, 49.00, 'V', 'Maisto', 'Sıfır', 400.00, 'Standart ölçek', '1:18'),
('Yamaha', 'MT-10', 'Mavi', 'Yok', 'Mevcut', 3, 799.00, 44.00, 'K', 'NewRay', 'Sıfır', 350.00, 'Standart ölçek', '1:18'),
('Kawasaki', 'Z900', 'Yeşil', 'Mevcut', 'Mevcut', 2, 799.00, 44.00, 'V', 'NewRay', 'Sıfır', 350.00, 'Standart ölçek', '1:18'),
('Honda', 'CB1000R', 'Kırmızı', 'Yok', 'Mevcut', 4, 799.00, 44.00, 'K', 'NewRay', 'Sıfır', 350.00, 'Standart ölçek', '1:18');

-- 1:24 Scale (Small models)
INSERT INTO stock_items (marka, model, renk, stant, kutu_durumu, stok_adedi, satis_fiyati, etsy_satis_fiyati, tedarik, uretici, durum, toptan_alis_fiyati, notlar, olcek) VALUES
('BMW', 'S1000RR', 'Beyaz', 'Yok', 'Mevcut', 8, 599.00, 34.00, 'V', 'Maisto', 'Sıfır', 250.00, 'Küçük ölçek', '1:24'),
('Ducati', 'Panigale V4', 'Kırmızı', 'Yok', 'Mevcut', 6, 649.00, 39.00, 'K', 'Maisto', 'Sıfır', 300.00, 'Küçük ölçek', '1:24'),
('Yamaha', 'YZF R1', 'Mavi', 'Yok', 'Mevcut', 7, 599.00, 34.00, 'V', 'NewRay', 'Sıfır', 250.00, 'Küçük ölçek', '1:24'),
('Kawasaki', 'Ninja H2R', 'Siyah', 'Yok', 'Mevcut', 5, 649.00, 39.00, 'K', 'NewRay', 'Sıfır', 300.00, 'Küçük ölçek', '1:24'),
('Honda', 'CBR1000RR', 'Kırmızı', 'Yok', 'Mevcut', 6, 599.00, 34.00, 'V', 'NewRay', 'Sıfır', 250.00, 'Küçük ölçek', '1:24');

-- 1:32 Scale (Very small models)
INSERT INTO stock_items (marka, model, renk, stant, kutu_durumu, stok_adedi, satis_fiyati, etsy_satis_fiyati, tedarik, uretici, durum, toptan_alis_fiyati, notlar, olcek) VALUES
('BMW', 'S1000RR', 'Beyaz-Mavi', 'Yok', 'Mevcut', 12, 399.00, 24.00, 'V', 'Maisto', 'Sıfır', 150.00, 'Çok küçük ölçek', '1:32'),
('Ducati', 'Panigale V4', 'Kırmızı', 'Yok', 'Mevcut', 10, 449.00, 29.00, 'K', 'Maisto', 'Sıfır', 200.00, 'Çok küçük ölçek', '1:32'),
('Yamaha', 'YZF R1', 'Mavi', 'Yok', 'Mevcut', 15, 399.00, 24.00, 'V', 'NewRay', 'Sıfır', 150.00, 'Çok küçük ölçek', '1:32'),
('Kawasaki', 'Ninja ZX-10R', 'Yeşil', 'Yok', 'Mevcut', 8, 449.00, 29.00, 'K', 'NewRay', 'Sıfır', 200.00, 'Çok küçük ölçek', '1:32'),
('Honda', 'CBR1000RR', 'Kırmızı', 'Yok', 'Mevcut', 11, 399.00, 24.00, 'V', 'NewRay', 'Sıfır', 150.00, 'Çok küçük ölçek', '1:32'),
('KTM', 'SuperDuke 1290', 'Turuncu', 'Yok', 'Mevcut', 9, 449.00, 29.00, 'K', 'Maisto', 'Sıfır', 200.00, 'Çok küçük ölçek', '1:32');
