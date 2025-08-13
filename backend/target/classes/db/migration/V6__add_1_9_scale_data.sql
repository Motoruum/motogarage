-- Migration V6: Add 1:9 scale stock data
INSERT INTO stock_items (marka, model, renk, stant, kutu_durumu, stok_adedi, satis_fiyati, etsy_satis_fiyati, tedarik, uretici, durum, toptan_alis_fiyati, notlar, olcek) VALUES
('Yamaha', 'YZF R1', 'Mavi', 'Yok', 'Mevcut', 3, 1899.00, 89.00, 'V', 'NewRay', 'Sıfır', 900.00, 'Orta ölçek', '1:9'),
('Kawasaki', 'Ninja ZX-10R', 'Yeşil', 'Mevcut', 'Mevcut', 2, 1999.00, 99.00, 'K', 'NewRay', 'Sıfır', 950.00, 'Orta ölçek', '1:9'),
('Honda', 'CBR1000RR', 'Kırmızı', 'Yok', 'Mevcut', 1, 1899.00, 89.00, 'V', 'NewRay', 'Sıfır', 900.00, 'Orta ölçek', '1:9');
